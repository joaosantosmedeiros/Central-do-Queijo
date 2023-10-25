import { CreateAccountUseCase } from '@application/usecases/account-usecases/create-account-usecase';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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

import { CreateAccountBody } from '../dto/create-account-body';
import { PasswordDontMatchException } from '../exceptions/password-dont-match-exception';
import { EmailInUseException } from '../exceptions/email-in-use-exception';
import { Account } from '@application/entities/account/account';
import { UpdateAccountBody } from '../dto/update-account-body';
import { EntityNotFoundException } from '../exceptions/entity-not-found-exception';

@Controller('account')
export class AccountController {
  constructor(
    private createAccountUseCase: CreateAccountUseCase,
    private listAllAccountsUseCase: ListAllAccountsUseCase,
    private findAccountByEmailUseCase: FindAccountByEmailUseCase,
    private deleteAccountByEmailUseCase: DeleteAccountUseCase,
    private updateAccountUseCase: UpdateAccountUseCase,
  ) {}

  @Get()
  async listAll() {
    const accounts = await this.listAllAccountsUseCase.execute();

    return { accounts };
  }

  @Get(':email')
  async findById(@Param('email') email: string): Promise<Account | null> {
    const account = await this.findAccountByEmailUseCase.execute(email);

    if (!account) {
      throw new EntityNotFoundException('Account');
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

  @Put(':email')
  async update(
    @Param('email') email: string,
    @Body() updateAccountBody: UpdateAccountBody,
  ): Promise<Account> {
    const account = await this.findAccountByEmailUseCase.execute(email);
    if (!account) {
      throw new EntityNotFoundException('Account');
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

  @Delete(':email')
  @HttpCode(204)
  async delete(@Param('email') email: string): Promise<void> {
    const account = await this.findAccountByEmailUseCase.execute(email);
    if (!account) {
      throw new EntityNotFoundException('Account');
    }

    await this.deleteAccountByEmailUseCase.execute(email);
  }
}
