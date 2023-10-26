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
import { EmailInUseException } from '../exceptions/email-in-use-exception';
import { Account } from '@application/entities/account/account';
import { UpdateAccountBody } from '../dto/body/update-account-body';
import { EntityNotFoundException } from '../exceptions/entity-not-found-exception';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from 'src/enums/user-type.enum';
import { UserId } from '../decorators/user-id.decorator';

@Controller('account')
export class AccountController {
  constructor(
    private createAccountUseCase: CreateAccountUseCase,
    private listAllAccountsUseCase: ListAllAccountsUseCase,
    private findAccountByEmailUseCase: FindAccountByEmailUseCase,
    private deleteAccountByEmailUseCase: DeleteAccountUseCase,
    private updateAccountUseCase: UpdateAccountUseCase,
  ) {}

  @Roles(UserType.Admin)
  @Get()
  async listAll() {
    const accounts = await this.listAllAccountsUseCase.execute();

    return { accounts };
  }

  @Roles(UserType.User, UserType.Admin)
  @Get(':email')
  async findByEmail(
    @Param('email') email: string,
    @UserId() userId: string,
  ): Promise<Account | null> {
    const account = await this.findAccountByEmailUseCase.execute(email);

    if (!account || !account.isActive) {
      throw new EntityNotFoundException('Account');
    }

    if (account.id != userId) {
      throw new HttpException('Restricted', HttpStatus.FORBIDDEN);
    }

    return account;
  }

  @Post()
  async create(@Body() body: CreateAccountBody) {
    const { name, email, password, confirmPassword } = body;
    if (password !== confirmPassword) {
      throw new PasswordDontMatchException();
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    try {
      const { account } = await this.createAccountUseCase.execute({
        name,
        email,
        password: hashedPassword,
      });

      return { account };
    } catch (err: any) {
      if (err.code === 'P2002') {
        throw new EmailInUseException();
      }
    }
  }

  @Roles(UserType.Admin, UserType.User)
  @Put(':email')
  async update(
    @Param('email') email: string,
    @UserId() userId: string,
    @Body() updateAccountBody: UpdateAccountBody,
  ): Promise<Account> {
    const account = await this.findAccountByEmailUseCase.execute(email);
    if (!account || !account.isActive) {
      throw new EntityNotFoundException('Account');
    }

    if (account.id != userId) {
      throw new HttpException('Restricted', HttpStatus.FORBIDDEN);
    }

    if (updateAccountBody.newEmail) {
      const emailInUse = await this.findAccountByEmailUseCase.execute(
        updateAccountBody.newEmail,
      );
      if (emailInUse) {
        throw new EmailInUseException();
      }
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
    @UserId() userId: string,
  ): Promise<void> {
    const account = await this.findAccountByEmailUseCase.execute(email);
    if (!account || !account.isActive) {
      throw new EntityNotFoundException('Account');
    }

    if (account.id != userId) {
      throw new HttpException('Restricted', HttpStatus.FORBIDDEN);
    }

    await this.deleteAccountByEmailUseCase.execute(email);
  }
}
