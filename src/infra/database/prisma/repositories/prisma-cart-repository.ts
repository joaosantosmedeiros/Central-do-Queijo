import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { CartRepository } from '@application/repositories/cart-repository';
import { Cart } from '@application/entities/cart/cart';
import { PrismaCartMapper } from '../mappers/prisma-cart-mapper';

@Injectable()
export class PrismaCartRepository implements CartRepository {
  constructor(private prismaService: PrismaService) {}
  async verifyActiveCart(accountId: string): Promise<Cart | null> {
    const cart = await this.prismaService.cart.findFirst({
      where: {
        accountId,
      },
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
