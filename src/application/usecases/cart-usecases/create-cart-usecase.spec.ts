import { InMemoryCartRepository } from '@test/repositories/in-memory-carts-repository';
import { CreateCartUseCase } from './create-cart-usecase';
import { Cart } from '@application/entities/cart/cart';

describe('CreateCartUseCase', () => {
  it('should be able to create a new cart', async () => {
    const cartRepository = new InMemoryCartRepository();
    const createCartUseCase = new CreateCartUseCase(cartRepository);

    const cart = await createCartUseCase.execute('any_id');

    expect(cart).toBeTruthy();
  });

  it('should return the cart if it already exists', async () => {
    const cartRepository = new InMemoryCartRepository();
    const createCartUseCase = new CreateCartUseCase(cartRepository);
    cartRepository.carts.push(new Cart({ accountId: 'any_account_id' }));

    const { cart } = await createCartUseCase.execute('any_account_id');

    expect(cart).toBeTruthy();
    expect(cart).toEqual(cartRepository.carts[0]);
  });
});
