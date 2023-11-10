import { Cart } from '@application/entities/cart/cart';
import { PrismaCartProductMapper } from './prisma-cart-product-mapper';

export class PrismaCartMapper {
  static toPrisma(cart: Cart) {
    return {
      id: cart.id,
      accountId: cart.accountId,
      isActive: cart.isActive,
    };
  }

  static toDomain(raw: any) {
    return new Cart(
      {
        accountId: raw.accountId,
        isActive: raw.isActive,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        cartProduct: raw.CartProduct
          ? raw.CartProduct.map((cartProduct) =>
              PrismaCartProductMapper.toDomain(cartProduct),
            )
          : undefined,
      },
      raw.id,
    );
  }
}
