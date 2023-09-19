import { CreateAccountUseCase } from '@application/usecases/create-account-usecase';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateAccountBody } from '../dto/create-account-body';
import { PasswordDontMatchException } from '../exceptions/password-dont-match-exception';
import { EmailInUseException } from '../exceptions/email-in-use-exception';
import { ListAllAccountsUseCase } from '@application/usecases/list-accounts-usecase';
import { FindAccountByEmailUseCase } from '@application/usecases/find-account-by-email-usecase';
import { Account } from '@application/entities/account/account';
import { AccountNotFoundException } from '../exceptions/account-not-found-exception';
import { DeleteAccountUseCase } from '@application/usecases/delete-account-usecase';

@Controller('account')
export class AccountController {
  constructor(
    private createAccountUseCase: CreateAccountUseCase,
    private listAllAccountsUseCase: ListAllAccountsUseCase,
    private findAccountByEmailUseCase: FindAccountByEmailUseCase,
    private deleteAccountByEmailUseCase: DeleteAccountUseCase,
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
      throw new AccountNotFoundException();
    }

    return account;
  }

  @Post()
  async create(@Body() body: CreateAccountBody) {
    const { name, email, password, confirmPassword } = body;
    if (password !== confirmPassword) {
      throw new PasswordDontMatchException();
    }

    try {
      const { account } = await this.createAccountUseCase.execute({
        name,
        email,
        password,
      });

      return { account };
    } catch (err: any) {
      if (err.code === 'P2002') {
        throw new EmailInUseException();
      }
    }
  }

  @Delete(':email')
  async delete(@Param('email') email: string): Promise<void> {
    const account = await this.findAccountByEmailUseCase.execute(email);
    if (!account) {
      throw new AccountNotFoundException();
    }

    await this.deleteAccountByEmailUseCase.execute(email);
  }
}
