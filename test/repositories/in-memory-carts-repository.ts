import { Cart } from '@application/entities/cart/cart';
import { CartRepository } from '@application/repositories/cart-repository';

export class InMemoryCartRepository implements CartRepository {
  public carts: Cart[] = [];

  async findById(id: string): Promise<Cart | null> {
    return this.carts.find((cart) => cart.id === id) ?? null;
  }

  async findByAccountId(accountId: string): Promise<Cart | null> {
    return this.carts.find((cart) => cart.accountId === accountId) ?? null;
  }

  async list(): Promise<Cart[]> {
    return this.carts;
  }

  async create(createdCart: Cart): Promise<void> {
    const filteredCart = this.carts.filter(
      (cart) => cart.accountId == createdCart.accountId && cart.isActive,
    );

    if (filteredCart) {
      throw new Error('An active cart already exists');
    }

    this.carts.push(createdCart);
  }

  async delete(id: string): Promise<void> {
    const cart = this.carts.find((cart) => cart.id === id);

    if (!cart || !cart.isActive) {
      throw new Error('Cart not found');
    }

    cart.isActive = false;
  }
}
