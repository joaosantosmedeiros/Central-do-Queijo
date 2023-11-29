import { Account } from '@application/entities/account/account';
import { AccountRepository } from '@application/repositories/account-repository';
import { EntityNotFoundException } from '@infra/http/exceptions/entity-not-found-exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAccountByEmailUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(email: string): Promise<Account> {
    const account = await this.accountRepository.findByEmail(email);
    if (!account || !account.isActive) {
      throw new EntityNotFoundException('Account');
    }

    return account;
  }
}
