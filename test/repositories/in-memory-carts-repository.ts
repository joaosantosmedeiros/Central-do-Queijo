import { Cart } from '@application/entities/cart/cart';
import { CartRepository } from '@application/repositories/cart-repository';

export class InMemoryCartRepository implements CartRepository {
  public carts: Cart[] = [];

  async verifyActiveCart(accountId: string): Promise<Cart | null> {
    return this.carts.find((cart) => cart.accountId === accountId) ?? null;
  }

  async create(createdCart: Cart): Promise<Cart> {
    this.carts.push(createdCart);
    return createdCart;
  }
}
