import { InMemoryOrdersRepository } from '@test/repositories/in-memory-orders-repository';
import { ListOrdersUseCase } from './list-orders-usecase';
import { Order } from '@application/entities/order/order';

describe('ListOrdersUseCase', () => {
  it('should list orders correctly', async () => {
    const orderRepository = new InMemoryOrdersRepository();
    const listOrders = new ListOrdersUseCase(orderRepository);

    const order = new Order({
      accountId: 'any_acc_id',
      paymentId: 'any_pay_id',
    });

    orderRepository.create(order);
    orderRepository.create(order);

    const actual = (await listOrders.execute()).length;

    expect(actual).toBe(2);
  });
});
