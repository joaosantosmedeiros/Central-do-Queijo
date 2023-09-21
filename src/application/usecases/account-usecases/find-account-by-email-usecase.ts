import { Account } from '@application/entities/account/account';
import { AccountRepository } from '@application/repositories/account-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAccountByEmailUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(email: string): Promise<Account | null> {
    return this.accountRepository.findByEmail(email);
  }
}
