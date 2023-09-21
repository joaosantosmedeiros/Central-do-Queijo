import { PaymentStatus } from './payment-status';

describe('PaymentStatus', () => {
  it('should be able to create a new payment status', () => {
    const paymentStatus = new PaymentStatus({ name: 'any_name' });
    expect(paymentStatus).toBeTruthy();
  });

  it('should create a new payment status with correct values', () => {
    const paymentStatus = new PaymentStatus({ name: 'any_name' });

    expect(paymentStatus.updatedAt).toEqual(paymentStatus.createdAt);
    expect(paymentStatus.id).toBeTruthy();
    expect(paymentStatus.name).toBe('any_name');
  });

  it('should change updatedAt field if one or more fields are changed', async () => {
    const paymentStatus = new PaymentStatus({
      name: 'any_name',
    });
    const oldUpdatedAt = paymentStatus.updatedAt;

    await new Promise((res) => setTimeout(res, 1000));

    paymentStatus.name = 'another_name';
    const newUpdatedAt = paymentStatus.updatedAt;

    expect(oldUpdatedAt).not.toEqual(newUpdatedAt);
  });
});
