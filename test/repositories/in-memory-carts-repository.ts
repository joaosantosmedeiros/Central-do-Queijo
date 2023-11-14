import { Cart } from '@application/entities/cart/cart';
import { CartRepository } from '@application/repositories/cart-repository';

export class InMemoryCartRepository implements CartRepository {
  public carts: Cart[] = [];

  async findCartByUserId(accountId: string): Promise<Cart | null> {
    return (
      this.carts.find(
        (cart) => cart.accountId === accountId && cart.isActive == true,
      ) ?? null
    );
  }

  async create(createdCart: Cart): Promise<Cart> {
    this.carts.push(createdCart);
    return createdCart;
  }

  async disable(id: string): Promise<void> {
    const cart = this.carts.find((cart) => cart.id === id);
    if (!cart) {
      throw new Error('Cart not found.');
    }

    cart.isActive = false;
  }
}
