import { Cart } from './cart';

describe('Cart', () => {
  it('should be able to create a new cart', () => {
    const cart = new Cart({ accountId: 'any_id' });
    expect(cart).toBeTruthy();
  });

  it('should create a new cart with correct values', () => {
    const cart = new Cart({ accountId: 'any_id' });

    expect(cart.updatedAt).toEqual(cart.createdAt);
    expect(cart.id).toBeTruthy();
    expect(cart.isActive).toBe(true);
    expect(cart.accountId).toBe('any_id');
  });

  it('should change updatedAt field if one or more fields are changed', async () => {
    const cart = new Cart({ accountId: 'any_id' });
    const oldUpdatedAt = cart.updatedAt;

    await new Promise((res) => setTimeout(res, 1000));

    cart.isActive = false;
    const newUpdatedAt = cart.updatedAt;

    expect(oldUpdatedAt).not.toEqual(newUpdatedAt);
  });
});
