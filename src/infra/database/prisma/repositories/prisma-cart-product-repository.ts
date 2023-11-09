import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { CartProductRepository } from '@application/repositories/cart-product-repository';
import { PrismaCartProductMapper } from '../mappers/prisma-cart-product-mapper';
import { CartProduct } from '@application/entities/cart-product/cart-product';

@Injectable()
export class PrismaCartProductRepository implements CartProductRepository {
  constructor(private prismaService: PrismaService) {}
  async verifyProductInCart(
    productId: string,
    cartId: string,
  ): Promise<CartProduct | null> {
    const cartProduct = await this.prismaService.cartProduct.findFirst({
      where: {
        productId,
        cartId,
      },
    });

    return cartProduct ? PrismaCartProductMapper.toDomain(cartProduct) : null;
  }

  async create(cartProduct: CartProduct): Promise<CartProduct> {
    const createdCartProduct = await this.prismaService.cartProduct.create({
      data: PrismaCartProductMapper.toPrisma(cartProduct),
    });

    return PrismaCartProductMapper.toDomain(createdCartProduct);
  }

  async update(newAmount: number, id: string): Promise<CartProduct> {
    const cartProduct = await this.prismaService.cartProduct.update({
      where: {
        id,
      },
      data: { amount: newAmount },
    });

    return PrismaCartProductMapper.toDomain(cartProduct);
  }
}
