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
import { Account } from '@application/entities/account/account';
import { UpdateAccountBody } from '../dto/body/update-account-body';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from 'src/enums/user-type.enum';
import { AccountId } from '../decorators/account-id.decorator';
import { FindAccountByIdUseCase } from '@application/usecases/account-usecases';

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
  async listAll() {
    return this.listAllAccountsUseCase.execute();
  }

  @Roles(UserType.User, UserType.Admin)
  @Get(':email')
  async findByEmail(
    @Param('email') email: string,
    @AccountId() accountId: string,
  ): Promise<Account> {
    const account = await this.findAccountByEmailUseCase.execute(email);

    if (account.id != accountId) {
      throw new HttpException('Restricted', HttpStatus.FORBIDDEN);
    }

    return account;
  }

  @Roles(UserType.Admin, UserType.User)
  @Get()
  async getAccountInfo(@AccountId() accountId: string): Promise<Account> {
    return this.findAccountByIdUseCase.execute(accountId);
  }

  @Post()
  async create(@Body() body: CreateAccountBody): Promise<Account> {
    const { name, email, password, confirmPassword } = body;
    if (password !== confirmPassword) {
      throw new PasswordDontMatchException();
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    return this.createAccountUseCase.execute({
      name,
      email,
      password: hashedPassword,
    });
  }

  @Roles(UserType.Admin, UserType.User)
  @Put(':email')
  async update(
    @Param('email') email: string,
    @AccountId() accountId: string,
    @Body() updateAccountBody: UpdateAccountBody,
  ): Promise<Account> {
    const account = await this.findAccountByEmailUseCase.execute(email);

    if (account.id != accountId) {
      throw new HttpException('Restricted', HttpStatus.FORBIDDEN);
    }

    const saltOrRounds = 10;

    return this.updateAccountUseCase.execute({
      email,
      props: {
        newEmail: updateAccountBody.newEmail,
        newName: updateAccountBody.newName,
        newPassword: updateAccountBody.newPassword
          ? await bcrypt.hash(updateAccountBody.newPassword, saltOrRounds)
          : undefined,
      },
    });
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
