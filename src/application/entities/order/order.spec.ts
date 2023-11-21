import { Order } from './order';

describe('Order', () => {
  it('should be able to create a new order', () => {
    const order = new Order({ accountId: 'any_id', paymentId: 'any_id' });
    expect(order.updatedAt).toEqual(order.createdAt);
    expect(order.createdAt).toEqual(order.date);
    expect(order.id).toBeTruthy();
    expect(order.accountId).toBe('any_id');
    expect(order.paymentId).toBe('any_id');
  });
});
