import { Account } from '@application/entities/account';
import { Account as RawAccount } from '@prisma/client';

export class PrismaAccountMapper {
  static toPrisma(account: Account) {
    return {
      id: account.id,
      email: account.email,
      password: account.password,
      name: account.name,
      isAdmin: account.isAdmin,
    };
  }

  static toDomain(raw: RawAccount) {
    return new Account(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        isAdmin: raw.isAdmin,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      raw.id,
    );
  }
}
