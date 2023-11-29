import { Account } from '@application/entities/account/account';
import { AccountRepository } from '@application/repositories/account-repository';
import { Injectable } from '@nestjs/common';
import { FindAccountByEmailUseCase } from './find-account-by-email-usecase';
import { EmailInUseException } from '@infra/http/exceptions/email-in-use-exception';

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
  constructor(
    private accountRepository: AccountRepository,
    private findAccountByEmail: FindAccountByEmailUseCase,
  ) {}

  async execute(request: UpdateAccountRequest): Promise<Account> {
    if (request.props.newEmail) {
      const emailInUse = await this.findAccountByEmail
        .execute(request.props.newEmail)
        .catch(() => undefined);

      if (emailInUse) {
        throw new EmailInUseException();
      }
    }

    return this.accountRepository.update(request.email, request.props);
  }
}
