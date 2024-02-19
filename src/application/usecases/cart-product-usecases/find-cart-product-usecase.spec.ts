import { InMemoryCartProductRepository } from '@test/repositories/in-memory-cart-products-repository';
import { CartProduct } from '@application/entities/cart-product/cart-product';
import { FindCartProductUseCase } from './find-cart-product-usecase';
import { EntityNotFoundException } from '@infra/http/exceptions/entity-not-found-exception';

describe('FindCartProductUSeCase', () => {
  it('should be able to find a cart product', async () => {
    const cartProductRepository = new InMemoryCartProductRepository();
    const findCartProduct = new FindCartProductUseCase(cartProductRepository);
    const cartProduct = new CartProduct({
      cartId: 'valid_id',
      productId: 'valid_id',
      amount: 1,
    });
    cartProductRepository.cartProducts.push(cartProduct);

    const foundCartProduct = await findCartProduct.execute(
      'valid_id',
      'valid_id',
    );

    expect(foundCartProduct).toBe(cartProduct);
  });

  it('should return throw if no cart product is found', async () => {
    const cartProductRepository = new InMemoryCartProductRepository();
    const findCartProduct = new FindCartProductUseCase(cartProductRepository);

    await expect(findCartProduct.execute('fake_id', 'fake_id')).rejects.toThrow(
      EntityNotFoundException,
    );
  });
});
