import { CreateAccountUseCase } from '@application/usecases/account-usecases/create-account-usecase';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  DeleteAccountUseCase,
  FindAccountByEmailUseCase,
  ListAllAccountsUseCase,
  UpdateAccountUseCase,
} from '@application/usecases/account-usecases';
import * as bcrypt from 'bcrypt';

import { CreateAccountBody } from '../dto/body/create-account-body';
import { PasswordDontMatchException } from '../exceptions/password-dont-match-exception';
import { UpdateAccountBody } from '../dto/body/update-account-body';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from 'src/enums/user-type.enum';
import { AccountId } from '../decorators/account-id.decorator';
import { FindAccountByIdUseCase } from '@application/usecases/account-usecases';
import { ReturnAccountDto } from '../dto/return/return-account-dto';

@Controller('account')
export class AccountController {
  constructor(
    private createAccountUseCase: CreateAccountUseCase,
    private listAllAccountsUseCase: ListAllAccountsUseCase,
    private findAccountByEmailUseCase: FindAccountByEmailUseCase,
    private findAccountByIdUseCase: FindAccountByIdUseCase,
    private deleteAccountByEmailUseCase: DeleteAccountUseCase,
    private updateAccountUseCase: UpdateAccountUseCase,
  ) {}

  @Roles(UserType.Admin)
  @Get('/all')
  async listAll(): Promise<ReturnAccountDto[]> {
    return (await this.listAllAccountsUseCase.execute()).map(
      (account) => new ReturnAccountDto(account),
    );
  }

  @Roles(UserType.User, UserType.Admin)
  @Get(':email')
  async findByEmail(
    @Param('email') email: string,
    @AccountId() accountId: string,
  ): Promise<ReturnAccountDto> {
    const account = await this.findAccountByEmailUseCase.execute(email);

    if (account.id != accountId) {
      throw new HttpException('Restricted', HttpStatus.FORBIDDEN);
    }

    return new ReturnAccountDto(account);
  }

  @Roles(UserType.Admin, UserType.User)
  @Get()
  async getAccountInfo(
    @AccountId() accountId: string,
  ): Promise<ReturnAccountDto> {
    return new ReturnAccountDto(
      await this.findAccountByIdUseCase.execute(accountId),
    );
  }

  @Post()
  async create(@Body() body: CreateAccountBody): Promise<ReturnAccountDto> {
    const { name, email, password, confirmPassword } = body;
    if (password !== confirmPassword) {
      throw new PasswordDontMatchException();
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const account = await this.createAccountUseCase.execute({
      name,
      email,
      password: hashedPassword,
    });

    return new ReturnAccountDto(account);
  }

  @Roles(UserType.Admin, UserType.User)
  @Put(':email')
  async update(
    @Param('email') email: string,
    @AccountId() accountId: string,
    @Body() updateAccountBody: UpdateAccountBody,
  ): Promise<ReturnAccountDto> {
    const account = await this.findAccountByEmailUseCase.execute(email);

    if (account.id != accountId) {
      throw new HttpException('Restricted', HttpStatus.FORBIDDEN);
    }

    const saltOrRounds = 10;

    const updatedAccount = await this.updateAccountUseCase.execute({
      email,
      props: {
        newEmail: updateAccountBody.newEmail,
        newName: updateAccountBody.newName,
        newPassword: updateAccountBody.newPassword
          ? await bcrypt.hash(updateAccountBody.newPassword, saltOrRounds)
          : undefined,
      },
    });

    return new ReturnAccountDto(updatedAccount);
  }

  @Roles(UserType.Admin, UserType.User)
  @Delete(':email')
  @HttpCode(204)
  async delete(
    @Param('email') email: string,
    @AccountId() accountId: string,
  ): Promise<void> {
    const account = await this.findAccountByEmailUseCase.execute(email);

    if (account.id != accountId) {
      throw new HttpException('Restricted', HttpStatus.FORBIDDEN);
    }

    await this.deleteAccountByEmailUseCase.execute(email);
  }
}
