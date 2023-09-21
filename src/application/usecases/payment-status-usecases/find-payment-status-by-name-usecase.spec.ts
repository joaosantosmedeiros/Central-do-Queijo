import { InMemoryPaymentStatusRepository } from '@test/repositories/in-memory-payment-statuses-repository';
import { makePaymentStatus } from '@test/factories/payment-status-factory';
import { FindPaymentStatusByNameUseCase } from './find-payment-status-by-name-usecase';

describe('FindPaymentStatusByNameUseCase', () => {
  it('should find an existing payment status', async () => {
    const inMemoryPaymentStatusRepository =
      new InMemoryPaymentStatusRepository();
    const findPaymentStatusByNameUseCase = new FindPaymentStatusByNameUseCase(
      inMemoryPaymentStatusRepository,
    );

    await inMemoryPaymentStatusRepository.create(makePaymentStatus());
    await inMemoryPaymentStatusRepository.create(
      makePaymentStatus('another_name'),
    );

    const paymentStatuses = await inMemoryPaymentStatusRepository.list();
    const paymentStatus = await findPaymentStatusByNameUseCase.execute(
      paymentStatuses[1].name,
    );

    expect(paymentStatus).toBe(paymentStatuses[1]);
  });

  it('should return null if no payment status is found', async () => {
    const inMemoryPaymentStatusRepository =
      new InMemoryPaymentStatusRepository();
    const findPaymentStatusByNameUseCase = new FindPaymentStatusByNameUseCase(
      inMemoryPaymentStatusRepository,
    );

    const paymentStatus =
      await findPaymentStatusByNameUseCase.execute('fake_name');

    expect(paymentStatus).toBeNull();
  });
});
