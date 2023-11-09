import { CartProduct } from '@application/entities/cart-product/cart-product';
import { CartProduct as RawCartProduct } from '@prisma/client';

export class PrismaCartProductMapper {
  static toPrisma(cartProduct: CartProduct) {
    return {
      id: cartProduct.id,
      cartId: cartProduct.cartId,
      amount: cartProduct.amount,
      productId: cartProduct.productId,
    };
  }

  static toDomain(raw: RawCartProduct): CartProduct {
    return new CartProduct(
      {
        amount: raw.amount,
        cartId: raw.cartId,
        productId: raw.productId,
      },
      raw.id,
    );
  }
}
