import { OrderProduct } from './order-product';

describe('OrderProduct', () => {
  it('should be able to create a new cart product with correct values', () => {
    const orderProduct = new OrderProduct({
      orderId: 'any_id',
      price: 999,
      amount: 1,
      productId: 'any_id',
    });
    expect(orderProduct.id).toBeTruthy();
    expect(orderProduct.updatedAt).toEqual(orderProduct.createdAt);
    expect(orderProduct.productId).toBe('any_id');
    expect(orderProduct.orderId).toBe('any_id');
    expect(orderProduct.amount).toBe(1);
    expect(orderProduct.price).toBe(999);
  });
});
