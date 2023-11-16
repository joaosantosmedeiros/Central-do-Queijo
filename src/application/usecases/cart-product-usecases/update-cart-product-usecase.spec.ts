import { InMemoryCartProductRepository } from '@test/repositories/in-memory-cart-products-repository';
import { UpdateCartProductUseCase } from './update-cart-product-usecase';
import { CartProduct } from '@application/entities/cart-product/cart-product';

describe('UpdateCartProductUseCase', () => {
  it('should update an cart product correctly', async () => {
    const inMemoryCartProductRepository = new InMemoryCartProductRepository();
    const updateCartProductUseCase = new UpdateCartProductUseCase(
      inMemoryCartProductRepository,
    );

    inMemoryCartProductRepository.cartProducts.push(
      new CartProduct(
        { amount: 1, cartId: 'any_id', productId: 'any_id' },
        'any_id',
      ),
    );

    await updateCartProductUseCase.execute(4, 'any_id');
    expect(inMemoryCartProductRepository.cartProducts[0].amount).toBe(4);
  });

  it('should throw an error if an invalid product is passed', async () => {
    const inMemoryCartProductRepository = new InMemoryCartProductRepository();
    const updateCartProductUseCase = new UpdateCartProductUseCase(
      inMemoryCartProductRepository,
    );

    expect(
      async () => await updateCartProductUseCase.execute(4, 'fake_id'),
    ).rejects.toThrow(Error);
  });
});
