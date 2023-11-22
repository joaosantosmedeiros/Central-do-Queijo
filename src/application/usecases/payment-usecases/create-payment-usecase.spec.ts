import { InMemoryPaymentsRepository } from '@test/repositories/in-memory-payments-repository';
import { CreatePaymentUseCase } from './create-payment-usecase';

describe('CreatePaymentUsecase', () => {
  it('should create a payment with correct values', async () => {
    const inMemoryPaymentsRepository = new InMemoryPaymentsRepository();
    const createPaymentUseCase = new CreatePaymentUseCase(
      inMemoryPaymentsRepository,
    );

    const code = 'any_code';
    const discount = 0;
    const price = 50;

    const payment = await createPaymentUseCase.execute({
      code,
      discount,
      price,
    });

    expect(payment.code).toBe(code);
    expect(payment.code).toBe(code);
    expect(payment.price).toBe(price);
  });
});
