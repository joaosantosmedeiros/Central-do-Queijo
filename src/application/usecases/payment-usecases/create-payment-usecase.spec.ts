import { InMemoryPaymentsRepository } from '@test/repositories/in-memory-payments-repository';
import { CreatePaymentUseCase } from './create-payment-usecase';
import { makeProduct } from '@test/factories/product-factory';
import { Product } from '@application/entities/product/product';
import { Cart } from '@application/entities/cart/cart';
import { CartProduct } from '@application/entities/cart-product/cart-product';

describe('CreatePaymentUsecase', () => {
  it('should create a payment with correct values', async () => {
    const inMemoryPaymentsRepository = new InMemoryPaymentsRepository();
    const createPaymentUseCase = new CreatePaymentUseCase(
      inMemoryPaymentsRepository,
    );

    const code = 'any_code';
    const discount = 0;

    const products: Product[] = [
      makeProduct('p1', 1, '1'),
      makeProduct('p2', 2, '2'),
    ];

    const cartProducts: CartProduct[] = [
      new CartProduct({ cartId: 'cart_id', amount: 5, productId: '1' }),
      new CartProduct({ cartId: 'cart_id', amount: 3, productId: '2' }),
    ];

    const price = 5 * 1 + 3 * 2;

    const cart = new Cart(
      {
        accountId: 'any_acc_id',
        cartProduct: cartProducts,
      },
      'cart_id',
    );

    const payment = await createPaymentUseCase.execute(
      {
        code,
        discount,
      },
      products,
      cart,
    );

    expect(payment.code).toBe(code);
    expect(payment.price).toBe(price);
  });

  it('should create a payment with 0 as final price if no CartProduct is found.', async () => {
    const inMemoryPaymentsRepository = new InMemoryPaymentsRepository();
    const createPaymentUseCase = new CreatePaymentUseCase(
      inMemoryPaymentsRepository,
    );

    const code = 'any_code';
    const discount = 0;

    const products: Product[] = [
      makeProduct('p1', 1, '1'),
      makeProduct('p2', 2, '2'),
    ];

    const cart = new Cart(
      {
        accountId: 'any_acc_id',
        cartProduct: [],
      },
      'cart_id',
    );

    const payment = await createPaymentUseCase.execute(
      { code, discount },
      products,
      cart,
    );

    expect(payment.code).toBe(code);
    expect(payment.price).toBe(0);
  });

  it('should create a payment with 0 as final price if CartProduct products are not found.', async () => {
    const inMemoryPaymentsRepository = new InMemoryPaymentsRepository();
    const createPaymentUseCase = new CreatePaymentUseCase(
      inMemoryPaymentsRepository,
    );

    const code = 'any_code';
    const discount = 0;

    const products: Product[] = [
      makeProduct('p1', 1, '1'),
      makeProduct('p2', 2, '2'),
    ];

    const cartProducts: CartProduct[] = [
      new CartProduct({
        cartId: 'cart_id',
        amount: 5,
        productId: '1',
      }),
      new CartProduct({
        cartId: 'cart_id',
        amount: 3,
        productId: 'invalid_id',
      }),
    ];

    const cart = new Cart(
      {
        accountId: 'any_acc_id',
        cartProduct: cartProducts,
      },
      'cart_id',
    );

    const payment = await createPaymentUseCase.execute(
      { code, discount },
      products,
      cart,
    );

    expect(payment.code).toBe(code);
    expect(payment.price).toBe(5);
  });

  it('should throw if no CartProducts exist.', async () => {
    const inMemoryPaymentsRepository = new InMemoryPaymentsRepository();
    const createPaymentUseCase = new CreatePaymentUseCase(
      inMemoryPaymentsRepository,
    );

    const code = 'any_code';
    const discount = 0;

    const products: Product[] = [
      makeProduct('p1', 1, '1'),
      makeProduct('p2', 2, '2'),
    ];

    const cart = new Cart(
      {
        accountId: 'any_acc_id',
      },
      'cart_id',
    );

    await expect(
      createPaymentUseCase.execute({ code, discount }, products, cart),
    ).rejects.toThrow();
  });
});
