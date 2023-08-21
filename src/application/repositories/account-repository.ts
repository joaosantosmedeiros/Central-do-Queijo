import { Account } from '@application/entities/account';

export abstract class AccountRepository {
  abstract create(account: Account): Promise<void>;
}
