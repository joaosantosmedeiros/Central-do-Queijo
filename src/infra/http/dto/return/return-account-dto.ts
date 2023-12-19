import { Account } from '@application/entities/account/account';

export class ReturnAccountDto {
  id: string;
  name: string;
  email: string;

  constructor(account: Account) {
    this.id = account.id;
    this.name = account.name;
    this.email = account.email;
  }
}
