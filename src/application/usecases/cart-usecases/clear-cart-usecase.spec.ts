import { InMemoryCartRepository } from '@test/repositories/in-memory-carts-repository';
import { Cart } from '@application/entities/cart/cart';
import { ClearCartUseCase } from './clear-cart-usecase';

describe('ClearCartUseCase', () => {
  it('should be able to clear a cart', async () => {
    const cartRepository = new InMemoryCartRepository();
    const clearCart = new ClearCartUseCase(cartRepository);

    const cart = new Cart({ accountId: 'any_id' }, 'any_id');
    cartRepository.carts.push(cart);

    await clearCart.execute(cart);

    expect(cart.isActive).toBeFalsy();
    expect(cartRepository.carts[0].isActive).toBeFalsy();
  });

  it('should throw an error if an inactive cart is disabled', async () => {
    const cartRepository = new InMemoryCartRepository();
    const clearCart = new ClearCartUseCase(cartRepository);

    const cart = new Cart({ accountId: 'any_id' }, 'any_id');
    async () => {
      expect(await clearCart.execute(cart)).rejects.toThrow();
    };
  });
});
