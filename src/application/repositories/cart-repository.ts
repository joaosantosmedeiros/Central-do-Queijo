import { Cart } from '@application/entities/cart/cart';

export abstract class CartRepository {
  abstract verifyActiveCart(accountId: string): Promise<Cart | null>;
  abstract create(cart: Cart): Promise<Cart>;
}
