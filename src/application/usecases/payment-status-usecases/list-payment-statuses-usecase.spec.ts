import { makePaymentStatus } from '@test/factories/payment-status-factory';
import { InMemoryPaymentStatusRepository } from '@test/repositories/in-memory-payment-statuses-repository';
import { ListPaymentStatusesUseCase } from './list-payment-statuses-usecase';

describe('List Payment Statuses Use Case', () => {
  it('should list payment statuses correctly', async () => {
    const inMemoryPaymentStatusRepository =
      new InMemoryPaymentStatusRepository();
    const listPaymentStatusesUseCase = new ListPaymentStatusesUseCase(
      inMemoryPaymentStatusRepository,
    );
    const expected = 2;

    inMemoryPaymentStatusRepository.create(makePaymentStatus());
    inMemoryPaymentStatusRepository.create(makePaymentStatus('another_name'));

    const actual = (await listPaymentStatusesUseCase.execute()).length;

    expect(actual).toBe(expected);
  });

  it('should not list duplicates', async () => {
    const inMemoryPaymentStatusRepository =
      new InMemoryPaymentStatusRepository();
    const listPaymentStatusesUseCase = new ListPaymentStatusesUseCase(
      inMemoryPaymentStatusRepository,
    );
    const expected = 1;

    inMemoryPaymentStatusRepository.create(makePaymentStatus());
    inMemoryPaymentStatusRepository
      .create(makePaymentStatus())
      .catch(() => undefined);

    const actual = (await listPaymentStatusesUseCase.execute()).length;

    expect(actual).toBe(expected);
  });
});
