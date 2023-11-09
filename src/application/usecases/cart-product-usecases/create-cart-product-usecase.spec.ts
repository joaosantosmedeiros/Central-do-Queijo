import { InMemoryCartProductRepository } from '@test/repositories/in-memory-cart-products-repository';
import { CreateCartProductUseCase } from './create-cart-product-usecase';
import { Cart } from '@application/entities/cart/cart';
import { CartProduct } from '@application/entities/cart-product/cart-product';

describe('Create CartProductUseCase Use Case', () => {
  it('should be able to create a new cart product', async () => {
    const cartProductRepository = new InMemoryCartProductRepository();
    const createCartProductUseCase = new CreateCartProductUseCase(
      cartProductRepository,
    );

    const cartProduct = await createCartProductUseCase.execute(
      {
        amount: 1,
        productId: 'valid_id',
      },
      new Cart({ accountId: 'valid_id' }),
    );

    expect(cartProduct).toBeTruthy();
  });

  it('should update an existing cart product amount', async () => {
    const cartProductRepository = new InMemoryCartProductRepository();
    const createCartProductUseCase = new CreateCartProductUseCase(
      cartProductRepository,
    );

    const cart = new Cart({ accountId: 'valid_id' });
    const cartProduct = new CartProduct({
      amount: 3,
      cartId: cart.id,
      productId: 'valid_id',
    });

    cartProductRepository.cartProducts.push(cartProduct);

    await createCartProductUseCase.execute(
      {
        amount: 4,
        productId: cartProduct.productId,
      },
      cart,
    );

    expect(cartProduct.amount).toBe(7);
  });
});
