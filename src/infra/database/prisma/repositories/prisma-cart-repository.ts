import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { CartRepository } from '@application/repositories/cart-repository';
import { Cart } from '@application/entities/cart/cart';
import { PrismaCartMapper } from '../mappers/prisma-cart-mapper';

@Injectable()
export class PrismaCartRepository implements CartRepository {
  constructor(private prismaService: PrismaService) {}
  async findCartByUserId(
    accountId: string,
    withRelations?: boolean,
  ): Promise<Cart | null> {
    const relations = withRelations
      ? {
          CartProduct: {
            include: {
              product: true,
            },
          },
        }
      : undefined;

    const cart = await this.prismaService.cart.findFirst({
      where: {
        accountId,
        isActive: true,
      },
      include: relations,
    });

    return cart ? PrismaCartMapper.toDomain(cart) : null;
  }

  async create(cart: Cart): Promise<Cart> {
    const createdCart = await this.prismaService.cart.create({
      data: PrismaCartMapper.toPrisma(cart),
    });

    return PrismaCartMapper.toDomain(createdCart);
  }
}
