import { Account } from '@application/entities/account';

export abstract class AccountRepository {
  abstract create(account: Account): Promise<void>;
  abstract list(): Promise<Account[]>;
  abstract findByEmail(email: string): Promise<Account | null>;
}
