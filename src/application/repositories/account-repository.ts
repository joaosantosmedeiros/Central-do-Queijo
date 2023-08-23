import { Account } from '@application/entities/account';

export abstract class AccountRepository {
  abstract findByEmail(email: string): Promise<Account | null>;
  abstract list(): Promise<Account[]>;
  abstract create(account: Account): Promise<void>;
  abstract delete(email: string): Promise<void>;
}
