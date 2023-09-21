import { Account } from '@application/entities/account/account';
import { AccountRepository } from '@application/repositories/account-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAllAccountsUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(): Promise<Account[]> {
    return this.accountRepository.list();
  }
}
