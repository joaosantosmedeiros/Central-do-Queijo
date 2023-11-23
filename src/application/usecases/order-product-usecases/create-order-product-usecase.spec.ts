import { InMemoryOrderProductsRepository } from '@test/repositories/in-memory-order-products-repository';
import { CreateOrderProductUseCase } from './create-order-product-usecase';

describe('CreateOrderProductUseCase', () => {
  it('should create a new OrderProduct', async () => {
    const orderProductRepository = new InMemoryOrderProductsRepository();
    const createOrderProductUseCase = new CreateOrderProductUseCase(
      orderProductRepository,
    );

    const amount = 99;
    const orderId = 'any_order_id';
    const price = 999;
    const productId = 'any_product_id';

    const orderProuct = await createOrderProductUseCase.execute({
      amount,
      orderId,
      price,
      productId,
    });

    expect(orderProuct.amount).toBe(amount);
    expect(orderProuct.orderId).toBe(orderId);
    expect(orderProuct.price).toBe(price);
    expect(orderProuct.productId).toBe(productId);
  });
});
