import { Cart } from '@application/entities/cart/cart';

export abstract class CartRepository {
  abstract findCartByUserId(
    accountId: string,
    withRelations?: boolean,
  ): Promise<Cart | null>;
  abstract create(cart: Cart): Promise<Cart>;
  abstract disable(id: string): Promise<void>;
}
