import { AccountRepository } from '@application/repositories/account-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAllAccountsUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute() {
    return await this.accountRepository.list();
  }
}
