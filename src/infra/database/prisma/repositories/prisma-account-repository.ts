import { Account } from '@application/entities/account';
import { AccountRepository } from '@application/repositories/account-repository';
import { PrismaService } from '../prisma.service';
import { PrismaAccountMapper } from '../mappers/prisma-account-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaAccountRepository implements AccountRepository {
  constructor(private prismaService: PrismaService) {}

  async list(): Promise<Account[]> {
    const raw = await this.prismaService.account.findMany({});
    const accounts = raw.map((account) =>
      PrismaAccountMapper.toDomain(account),
    );

    return accounts;
  }

  async create(account: Account): Promise<void> {
    const raw = PrismaAccountMapper.toPrisma(account);

    await this.prismaService.account.create({
      data: raw,
    });
  }
}
