import { InMemoryOrdersRepository } from '@test/repositories/in-memory-orders-repository';
import { FindOrderByAccountUseCase } from './find-order-by-account-usecase';
import { Order } from '@application/entities/order/order';

describe('FindOrderByAccountUseCase', () => {
  it('should find an existing order', async () => {
    const inMemoryOrdersRepository = new InMemoryOrdersRepository();
    const findOrdersByAccountId = new FindOrderByAccountUseCase(
      inMemoryOrdersRepository,
    );

    inMemoryOrdersRepository.orders = [
      new Order({ accountId: 'valid_account_id', paymentId: 'any_id' }),
      new Order({ accountId: 'valid_account_id', paymentId: 'any_id' }),
      new Order({ accountId: 'other_account_id', paymentId: 'other_id' }),
    ];

    const orders = await findOrdersByAccountId.execute('valid_account_id');

    const userOrders = [
      inMemoryOrdersRepository.orders[0],
      inMemoryOrdersRepository.orders[1],
    ];

    expect(orders).toEqual(userOrders);
  });

  it('should not find orders for an account with no orders', async () => {
    const inMemoryOrdersRepository = new InMemoryOrdersRepository();
    const findOrdersByAccountId = new FindOrderByAccountUseCase(
      inMemoryOrdersRepository,
    );

    inMemoryOrdersRepository.orders = [
      new Order({ accountId: 'valid_account_id', paymentId: 'any_id' }),
      new Order({ accountId: 'valid_account_id', paymentId: 'any_id' }),
    ];

    const orders = await findOrdersByAccountId.execute('other_account_id');

    expect(orders).toEqual([]);
  });
});
