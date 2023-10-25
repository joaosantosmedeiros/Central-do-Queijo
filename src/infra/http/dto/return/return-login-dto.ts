import { Account } from '@application/entities/account/account';

export interface ReturnLoginDto {
  account: Account;
  accessToken: string;
}
