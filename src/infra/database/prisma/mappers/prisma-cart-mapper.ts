import { Cart } from '@application/entities/cart/cart';
import { Cart as RawCart } from '@prisma/client';

export class PrismaCartMapper {
  static toPrisma(cart: Cart) {
    return {
      id: cart.id,
      accountId: cart.accountId,
      isActive: cart.isActive,
    };
  }

  static toDomain(raw: RawCart) {
    return new Cart(
      {
        accountId: raw.accountId,
        isActive: raw.isActive,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }
}
