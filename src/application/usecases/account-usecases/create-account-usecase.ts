import { Account } from '@application/entities/account/account';
import { AccountRepository } from '@application/repositories/account-repository';
import { Injectable } from '@nestjs/common';

export interface CreateAccountRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(request: CreateAccountRequest): Promise<Account> {
    const { name, email, password } = request;

    const account = new Account({
      name,
      email,
      password,
    });

    await this.accountRepository.create(account);

    return account;
  }
}
