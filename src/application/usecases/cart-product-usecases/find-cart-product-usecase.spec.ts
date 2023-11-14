import { InMemoryCartProductRepository } from '@test/repositories/in-memory-cart-products-repository';
import { CartProduct } from '@application/entities/cart-product/cart-product';
import { FindCartProductUseCase } from './find-cart-product-usecase';

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

  it('should return null if no cart product is found', async () => {
    const cartProductRepository = new InMemoryCartProductRepository();
    const findCartProduct = new FindCartProductUseCase(cartProductRepository);

    const foundCartProduct = await findCartProduct.execute(
      'fake_id',
      'fake_id',
    );

    expect(foundCartProduct).toBeNull();
  });
});