import { Account } from '@application/entities/account/account';
import { AccountRepository } from '@application/repositories/account-repository';
import { EmailInUseError } from '@application/usecases/errors/email-in-use-error';

export class InMemoryAccountRepository implements AccountRepository {
  public accounts: Account[] = [];

  async findByEmail(email: string): Promise<Account | null> {
    return this.accounts.filter((acc) => acc.email === email)[0] ?? null;
  }

  async list(): Promise<Account[]> {
    return this.accounts;
  }

  async create(account: Account): Promise<void> {
    if (this.accounts.filter((acc) => acc.email === account.email).length > 0) {
      throw new EmailInUseError();
    }
    this.accounts.push(account);
  }

  async update(
    email: string,
    props: {
      newName?: string | undefined;
      newEmail?: string | undefined;
      newPassword?: string | undefined;
    },
  ): Promise<Account> {
    const account = this.accounts.find((acc) => acc.email === email);

    if (!account) {
      throw new Error('Account not found');
    }

    const emailInUse = this.accounts.find((acc) => acc.email == props.newEmail);

    if (emailInUse) {
      throw new EmailInUseError();
    }

    account.email = props.newEmail ?? account.email;
    account.password = props.newPassword ?? account.password;
    account.name = props.newName ?? account.name;

    return account;
  }

  async delete(email: string): Promise<void> {
    const index = this.accounts.findIndex((acc) => acc.email === email);

    if (index === -1) {
      throw new Error('Account not found');
    }

    this.accounts.splice(index, 1);
  }
}
