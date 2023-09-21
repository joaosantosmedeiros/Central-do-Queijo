import { PaymentStatusAlreadyExistsError } from '../errors/payment-status-already-exists-error';
import { CreatePaymentStatusUseCase } from './create-payment-status-usecase';
import { InMemoryPaymentStatusRepository } from '@test/repositories/in-memory-payment-statuses-repository';

describe('Create Payment Status Use Case', () => {
  it('should be able to create a new payment status', async () => {
    const paymentStatusRepository = new InMemoryPaymentStatusRepository();
    const createPaymentStatusUseCase = new CreatePaymentStatusUseCase(
      paymentStatusRepository,
    );

    const { paymentStatus } = await createPaymentStatusUseCase.execute({
      name: 'any_name',
    });

    expect(paymentStatus).toBeTruthy();
  });

  it('should not be able to create an payment status with an used name', async () => {
    const paymentStatusRepository = new InMemoryPaymentStatusRepository();
    const createPaymentStatusUseCase = new CreatePaymentStatusUseCase(
      paymentStatusRepository,
    );

    await createPaymentStatusUseCase.execute({
      name: 'any_name',
    });

    expect(async () => {
      await createPaymentStatusUseCase.execute({
        name: 'any_name',
      });
    }).rejects.toThrow(PaymentStatusAlreadyExistsError);
  });
});
