import { PaymentStatus } from '../../../enums/payment-status.enum';
import { Payment } from './payment';

describe('Payment', () => {
  it('should create a new payment with correct values', () => {
    const payment = new Payment({ code: 'any_code', discount: 20, price: 100 });

    expect(payment.id).toBeTruthy();
    expect(payment.status).toBe(PaymentStatus.PENDING);
    expect(payment.price).toBe(100);
    expect(payment.discount).toBe(20);
    expect(payment.finalPrice).toBe(80);
    expect(payment.code).toBe('any_code');
    expect(payment.paymentDate).toBeUndefined();
  });

  it('should update the finalPrice if the discount is altered', () => {
    const payment = new Payment({ code: 'any_code', discount: 20, price: 100 });

    payment.discount = 10;
    expect(payment.finalPrice).toBe(90);
  });

  it('should update the finalPrice if the price is altered', () => {
    const payment = new Payment({ code: 'any_code', discount: 20, price: 100 });

    payment.price = 200;
    expect(payment.finalPrice).toBe(160);
  });

  it('should not be able to pay twice', () => {
    const payment = new Payment({ code: 'any_code', discount: 20, price: 100 });

    payment.pay();

    async () => {
      expect(payment.pay()).rejects.toThrow();
    };
  });

  it('should not be able to create a payment with a negative discount', () => {
    async () => {
      expect(
        new Payment({ code: 'any_code', discount: -1, price: 100 }),
      ).rejects.toThrow();
    };
  });
});
