import { Account } from '@application/entities/account/account';
import { randomUUID } from 'crypto';

export function makeAccount(
  email = 'any_mail@mail.com',
  name = 'any_name',
  password = 'any_password',
  createdAt = new Date(),
  updatedAt = new Date(),
  isActive = true,
  userType = 1,
  id = randomUUID(),
) {
  return new Account(
    {
      email,
      name,
      password,
      isActive,
      createdAt,
      updatedAt,
      userType,
    },
    id,
  );
}
