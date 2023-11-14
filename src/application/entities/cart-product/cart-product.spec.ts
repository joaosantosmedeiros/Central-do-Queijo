import { CartProduct } from './cart-product';

describe('CartProduct', () => {
  it('should be able to create a new cart product with correct values', () => {
    const cartProduct = new CartProduct({
      amount: 1,
      cartId: 'any_id',
      productId: 'any_id',
    });
    expect(cartProduct).toBeTruthy();
    expect(cartProduct.updatedAt).toEqual(cartProduct.createdAt);
    expect(cartProduct.id).toBeTruthy();
    expect(cartProduct.cartId).toBe('any_id');
    expect(cartProduct.productId).toBe('any_id');
    expect(cartProduct.amount).toBe(1);
  });
});
