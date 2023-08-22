import { Account } from '@application/entities/account';
import { AccountRepository } from '@application/repositories/account-repository';
import { EmailInUseError } from '@application/usecases/errors/email-in-use-error';

export class InMemoryAccountRepository implements AccountRepository {
  public accounts: Account[] = [];

  async create(account: Account): Promise<void> {
    if (this.accounts.filter((acc) => acc.email === account.email).length > 0) {
      throw new EmailInUseError();
    }
    this.accounts.push(account);
  }
}
