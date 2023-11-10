import { CartProduct } from '@application/entities/cart-product/cart-product';
import { PrismaProductMapper } from './prisma-product-mapper';

export class PrismaCartProductMapper {
  static toPrisma(cartProduct: CartProduct) {
    return {
      id: cartProduct.id,
      cartId: cartProduct.cartId,
      amount: cartProduct.amount,
      productId: cartProduct.productId,
    };
  }

  static toDomain(raw: any): CartProduct {
    return new CartProduct(
      {
        amount: raw.amount,
        cartId: raw.cartId,
        productId: raw.productId,
        product: raw.product
          ? PrismaProductMapper.toDomain(raw.product)
          : undefined,
      },
      raw.id,
    );
  }
}
