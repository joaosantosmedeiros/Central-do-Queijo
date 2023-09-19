import { Account } from '@application/entities/account/account';
import { Account as RawAccount } from '@prisma/client';

export class PrismaAccountMapper {
  static toPrisma(account: Account) {
    return {
      id: account.id,
      email: account.email,
      password: account.password,
      name: account.name,
      userType: account.userType,
      isActive: account.isActive,
    };
  }

  static toDomain(raw: RawAccount) {
    return new Account(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        userType: raw.userType,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        isActive: raw.isActive,
      },
      raw.id,
    );
  }
}
