import { Account } from '@application/entities/account/account';
import { AccountRepository } from '@application/repositories/account-repository';
import { EntityNotFoundException } from '@infra/http/exceptions/entity-not-found-exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAccountByIdUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(accountId: string): Promise<Account> {
    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new EntityNotFoundException('Account');
    }
    return account;
  }
}
