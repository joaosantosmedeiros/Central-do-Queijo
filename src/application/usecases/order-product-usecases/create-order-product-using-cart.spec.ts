import { InMemoryOrderProductsRepository } from '@test/repositories/in-memory-order-products-repository';
import { CreateOrderProductUseCase } from './create-order-product-usecase';
import { CreateOrderProductUsingCartUseCase } from './create-order-product-using-cart';
import { Cart } from '@application/entities/cart/cart';
import { CartProduct } from '@application/entities/cart-product/cart-product';
import { Product } from '@application/entities/product/product';
import { makeProduct } from '@test/factories/product-factory';
import { HttpException } from '@nestjs/common';

describe('CreateOrderProductUsingCartUseCase', () => {
  it('should create order products correctly', async () => {
    const orderProductRepository = new InMemoryOrderProductsRepository();
    const createOrderProductUseCase = new CreateOrderProductUseCase(
      orderProductRepository,
    );
    const createOrderProductUsingCartUseCase =
      new CreateOrderProductUsingCartUseCase(createOrderProductUseCase);

    const cart = new Cart(
      {
        accountId: 'any_id',
        cartProduct: [
          new CartProduct({
            amount: 11,
            cartId: 'any_cart_id',
            productId: '1',
          }),
          new CartProduct({
            amount: 12,
            cartId: 'any_cart_id',
            productId: '2',
          }),
        ],
      },
      'any_cart_id',
    );

    const products: Product[] = [
      makeProduct('p1', 1, '1'),
      makeProduct('p2', 2, '2'),
    ];

    const [orderProduct1, orderProduct2] =
      await createOrderProductUsingCartUseCase.execute(
        cart,
        'any_order_id',
        products,
      );

    expect(orderProduct1.price).toBe(1);
    expect(orderProduct1.amount).toBe(11);
    expect(orderProduct1.productId).toBe('1');
    expect(orderProduct2.price).toBe(2);
    expect(orderProduct2.amount).toBe(12);
    expect(orderProduct2.productId).toBe('2');
  });

  it('should throw if no products are inserted on the cart', async () => {
    const repository = new InMemoryOrderProductsRepository();
    const createOrderProduct = new CreateOrderProductUseCase(repository);
    const createOrderProductUsingCart = new CreateOrderProductUsingCartUseCase(
      createOrderProduct,
    );

    const cart = new Cart(
      {
        accountId: 'any_id',
        cartProduct: [],
      },
      'any_cart_id',
    );

    await expect(
      createOrderProductUsingCart.execute(cart, 'any_order_id', []),
    ).rejects.toThrow(HttpException);
  });
});
