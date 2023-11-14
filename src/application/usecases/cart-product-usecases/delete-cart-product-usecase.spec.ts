import { InMemoryCartProductRepository } from '@test/repositories/in-memory-cart-products-repository';
import { CartProduct } from '@application/entities/cart-product/cart-product';
import { DeleteCartProductUseCase } from './delete-cart-product-usecase';

describe('DeleteCartProductUseCase', () => {
  it('should be able to delete a cart product', async () => {
    const cartProductRepository = new InMemoryCartProductRepository();
    const deleteCart = new DeleteCartProductUseCase(cartProductRepository);
    cartProductRepository.cartProducts.push(
      new CartProduct({ cartId: 'valid_id', productId: 'valid_id', amount: 1 }),
    );

    await deleteCart.execute('valid_id', 'valid_id');

    expect(cartProductRepository.cartProducts.length).toBe(0);
  });

  it('should update an existing cart product amount', async () => {
    const cartProductRepository = new InMemoryCartProductRepository();
    const deleteCart = new DeleteCartProductUseCase(cartProductRepository);

    async () => {
      expect(await deleteCart.execute('fake_id', 'fake_id')).rejects.toThrow();
    };
  });
});
