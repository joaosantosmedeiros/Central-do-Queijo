import { Account } from '@application/entities/account/account';

export class LoginPayload {
  id: string;
  userType: number;

  constructor(account: Account) {
    this.id = account.id;
    this.userType = account.userType;
  }
}
