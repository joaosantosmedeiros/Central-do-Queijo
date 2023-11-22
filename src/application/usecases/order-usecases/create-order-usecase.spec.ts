import { InMemoryOrdersRepository } from '@test/repositories/in-memory-orders-repository';
import { CreateOrderUseCase } from './create-order-usecase';

describe('CreateOrderUseCase', () => {
  it('should be able to create a new order', async () => {
    const inMemoryOrderRepository = new InMemoryOrdersRepository();
    const createOrderUseCase = new CreateOrderUseCase(inMemoryOrderRepository);

    const accountId = 'any_acc_id';
    const paymentId = 'any_payment_id';

    const order = await createOrderUseCase.execute({
      accountId,
      paymentId,
    });

    console.log(order);

    expect(order.accountId).toBe(accountId);
    expect(order.paymentId).toBe(paymentId);
  });
});
