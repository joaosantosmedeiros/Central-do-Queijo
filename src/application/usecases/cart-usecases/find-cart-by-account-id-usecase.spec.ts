import { InMemoryCartRepository } from '@test/repositories/in-memory-carts-repository';
import { FindCartByAccountIdUseCase } from './find-cart-by-account-id-usecase';
import { Cart } from '@application/entities/cart/cart';

describe('FindCartByAccountIdUseCase', () => {
  it('should be able to find an existing cart', async () => {
    const cartRepository = new InMemoryCartRepository();
    const findCartByAccountId = new FindCartByAccountIdUseCase(cartRepository);
    cartRepository.carts.push(new Cart({ accountId: 'any_id' }, 'any_id'));

    const cart = await findCartByAccountId.execute('any_id');

    expect(cart).toBeTruthy();
  });

  it('should return null if the cart does not exists', async () => {
    const cartRepository = new InMemoryCartRepository();
    const findCartByAccountId = new FindCartByAccountIdUseCase(cartRepository);

    const cart = await findCartByAccountId.execute('any_account_id');

    expect(cart).toBeNull();
  });
});
