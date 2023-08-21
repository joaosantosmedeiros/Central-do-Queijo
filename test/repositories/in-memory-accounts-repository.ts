import { Account } from '@application/entities/account';
import { AccountRepository } from '@application/repositories/account-repository';
import { PasswordDontMatchError } from '@application/usecases/errors/password-dont-match-error';

export class InMemoryAccountRepository implements AccountRepository {
  public accounts: Account[] = [];

  async create(account: Account): Promise<void> {
    if (this.accounts.filter((acc) => acc.email === account.email).length > 0) {
      throw new PasswordDontMatchError();
    }
    this.accounts.push(account);
  }
}
