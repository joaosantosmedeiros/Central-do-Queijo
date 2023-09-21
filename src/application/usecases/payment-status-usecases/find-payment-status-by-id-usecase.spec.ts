import { InMemoryPaymentStatusRepository } from '@test/repositories/in-memory-payment-statuses-repository';
import { FindPaymentStatusByIdUseCase } from './find-payment-status-by-id-usecase';
import { makePaymentStatus } from '@test/factories/payment-status-factory';

describe('Find PaymentStatus By Id', () => {
  it('should find an existing payment status', async () => {
    const inMemoryPaymentStatusRepository =
      new InMemoryPaymentStatusRepository();
    const findPaymentStatusByIdUseCase = new FindPaymentStatusByIdUseCase(
      inMemoryPaymentStatusRepository,
    );

    await inMemoryPaymentStatusRepository.create(makePaymentStatus());
    await inMemoryPaymentStatusRepository.create(
      makePaymentStatus('another_name'),
    );

    const paymentStatuses = await inMemoryPaymentStatusRepository.list();
    const paymentStatus = await findPaymentStatusByIdUseCase.execute(
      paymentStatuses[1].id,
    );

    expect(paymentStatus).toBe(paymentStatuses[1]);
  });

  it('should return null if no payment status is found', async () => {
    const inMemoryPaymentStatusRepository =
      new InMemoryPaymentStatusRepository();
    const findPaymentStatusByIdUseCase = new FindPaymentStatusByIdUseCase(
      inMemoryPaymentStatusRepository,
    );

    const paymentStatus = await findPaymentStatusByIdUseCase.execute('fake_id');

    expect(paymentStatus).toBeNull();
  });
});
