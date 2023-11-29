import { Account } from '@application/entities/account/account';
import { AccountRepository } from '@application/repositories/account-repository';
import { Injectable } from '@nestjs/common';
import { FindAccountByEmailUseCase } from './find-account-by-email-usecase';
import { EmailInUseException } from '@infra/http/exceptions/email-in-use-exception';

export interface CreateAccountRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateAccountUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private findAccoutByEmail: FindAccountByEmailUseCase,
  ) {}

  async execute(request: CreateAccountRequest): Promise<Account> {
    const { name, email, password } = request;

    const accountExists = await this.findAccoutByEmail
      .execute(email)
      .catch(() => undefined);
    if (accountExists) {
      throw new EmailInUseException();
    }

    const account = new Account({
      name,
      email,
      password,
    });

    await this.accountRepository.create(account);

    return account;
  }
}
