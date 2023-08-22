import { Account } from '@application/entities/account';
import { randomUUID } from 'crypto';

export function makeAccount(
  email = 'any_mail@mail.com',
  name = 'any_name',
  password = 'any_password',
  createdAt = new Date(),
  updatedAt = new Date(),
  deletedAt = null,
  isAdmin = false,
  id = randomUUID(),
) {
  return new Account(
    {
      email,
      name,
      password,
      isAdmin,
      createdAt,
      updatedAt,
      deletedAt,
    },
    id,
  );
}
