import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AccountRepository } from '@application/repositories/account-repository';
import { PrismaAccountRepository } from './prisma/repositories/prisma-account-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: AccountRepository,
      useClass: PrismaAccountRepository,
    },
  ],
  exports: [AccountRepository],
})
export class DatabaseModule {}
