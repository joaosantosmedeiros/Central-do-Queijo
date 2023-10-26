import { Cart } from '@application/entities/cart/cart';

export abstract class CartRepository {
  public carts: Cart[];

  abstract findById(id: string): Promise<Cart | null>;
  abstract findByAccountId(accountId: string): Promise<Cart | null>;
  abstract list(): Promise<Cart[]>;
  abstract create(cart: Cart): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
