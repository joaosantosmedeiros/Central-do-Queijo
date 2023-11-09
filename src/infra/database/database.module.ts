import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AccountRepository } from '@application/repositories/account-repository';
import { PrismaAccountRepository } from './prisma/repositories/prisma-account-repository';
import { CategoryRepository } from '@application/repositories/category-repository';
import { PrismaCategoryRepository } from './prisma/repositories/prisma-category-repository';
import { ProductRepository } from '@application/repositories/product-repository';
import { PrismaProductRepository } from './prisma/repositories/prisma-product-repository';
import { CartRepository } from '@application/repositories/cart-repository';
import { PrismaCartRepository } from './prisma/repositories/prisma-cart-repository';
import { CartProductRepository } from '@application/repositories/cart-product-repository';
import { PrismaCartProductRepository } from './prisma/repositories/prisma-cart-product-repository';

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
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
    {
      provide: CartRepository,
      useClass: PrismaCartRepository,
    },
    {
      provide: CartProductRepository,
      useClass: PrismaCartProductRepository,
    },
  ],
  exports: [
    AccountRepository,
    CategoryRepository,
    ProductRepository,
    CartRepository,
    CartProductRepository,
  ],
})
export class DatabaseModule {}
