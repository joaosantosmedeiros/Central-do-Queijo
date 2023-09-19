import { AccountRepository } from '@application/repositories/account-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(email: string): Promise<void> {
    await this.accountRepository.delete(email);
  }
}
