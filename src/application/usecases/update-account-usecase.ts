import { Account } from '@application/entities/account';
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
    const { props } = request;
    const account = await this.accountRepository.findByEmail(request.email);
    if (!account) {
      throw new Error('Account not found');
    }

    account.email = props.newEmail ?? account.email;
    account.password = props.newPassword ?? account.password;
    account.name = props.newName ?? account.name;

    return account;
  }
}
