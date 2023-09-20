import { Account } from '@application/entities/account/account';
import { AccountRepository } from '@application/repositories/account-repository';
import { Injectable } from '@nestjs/common';

export interface UpdateAccountRequest {
  email: string;
  props: {
    newEmail?: string;
    newPassword?: string;
    newName?: string;
  };
}

@Injectable()
export class UpdateAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(request: UpdateAccountRequest): Promise<Account> {
    return this.accountRepository.update(request.email, request.props);
  }
}
