import { InMemoryPaymentStatusRepository } from '@test/repositories/in-memory-payment-statuses-repository';
import { DeletePaymentStatusUseCase } from './delete-payment-status-usecase';
import { makePaymentStatus } from '@test/factories/payment-status-factory';

describe('DeletePaymentStatusUseCase', () => {
  it('should delete an payment status correctly', async () => {
    const inMemoryPaymentStatusRepository =
      new InMemoryPaymentStatusRepository();
    const deletePaymentStatusUseCase = new DeletePaymentStatusUseCase(
      inMemoryPaymentStatusRepository,
    );

    inMemoryPaymentStatusRepository.create(makePaymentStatus());
    const paymentStatus = inMemoryPaymentStatusRepository.paymentStatuses[0];

    await deletePaymentStatusUseCase.execute(paymentStatus.id);
    expect(inMemoryPaymentStatusRepository.paymentStatuses.length).toBe(0);
  });

  it('should not delete an unexistent account', async () => {
    const inMemoryPaymentStatusRepository =
      new InMemoryPaymentStatusRepository();
    const deletePaymentStatusUseCase = new DeletePaymentStatusUseCase(
      inMemoryPaymentStatusRepository,
    );

    expect(
      async () => await deletePaymentStatusUseCase.execute('fake_id'),
    ).rejects.toThrow(Error);
  });
});
