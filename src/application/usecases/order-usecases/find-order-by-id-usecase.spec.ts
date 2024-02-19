import { InMemoryOrdersRepository } from '@test/repositories/in-memory-orders-repository';
import { FindOrderByIdUseCase } from './find-order-by-id-usecase';
import { Order } from '@application/entities/order/order';
import { EntityNotFoundException } from '@infra/http/exceptions/entity-not-found-exception';

describe('FindOrderByIdUseCase', () => {
  it('should show an existing order correctly', async () => {
    const orderRepository = new InMemoryOrdersRepository();
    const findOrderById = new FindOrderByIdUseCase(orderRepository);

    const order = new Order(
      {
        accountId: 'any_acc_id',
        paymentId: 'any_pay_id',
      },
      'id-1',
    );
    orderRepository.orders.push(order);
    const foundOrder = await findOrderById.execute('id-1');

    expect(foundOrder).toEqual(order);
  });

  it('should throw if no order is found', async () => {
    const orderRepository = new InMemoryOrdersRepository();
    const findOrderById = new FindOrderByIdUseCase(orderRepository);

    await expect(findOrderById.execute('fake_id')).rejects.toThrow(
      EntityNotFoundException,
    );
  });
});
