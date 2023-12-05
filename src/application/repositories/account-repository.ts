import { Account } from '@application/entities/account/account';

export abstract class AccountRepository {
  abstract findById(id: string): Promise<Account | null>;
  abstract findByEmail(email: string): Promise<Account | null>;
  abstract list(): Promise<Account[]>;
  abstract create(account: Account): Promise<void>;
  abstract delete(email: string): Promise<void>;
  abstract update(
    email: string,
    props: {
      newName?: string;
      newEmail?: string;
      newPassword?: string;
    },
  ): Promise<Account>;
}
