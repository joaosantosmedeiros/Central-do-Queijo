import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AccountRepository } from '@application/repositories/account-repository';
import { PrismaAccountRepository } from './prisma/repositories/prisma-account-repository';
import { CategoryRepository } from '@application/repositories/category-repository';
import { PrismaCategoryRepository } from './prisma/repositories/prisma-category-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: AccountRepository,
      useClass: PrismaAccountRepository,
    },
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository,
    },
  ],
  exports: [AccountRepository, CategoryRepository],
})
export class DatabaseModule {}
