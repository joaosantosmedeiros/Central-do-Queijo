import { makePaymentStatus } from '@test/factories/payment-status-factory';
import { InMemoryPaymentStatusRepository } from '@test/repositories/in-memory-payment-statuses-repository';
import { UpdatePaymentStatusUseCase } from './update-payment-status-usecase';
import { PaymentStatusAlreadyExistsError } from '../errors/payment-status-already-exists-error';

describe('UpdatePaymentStatusUseCase', () => {
  it('should update a payment status properly', async () => {
    const inMemoryPaymentStatusRepository =
      new InMemoryPaymentStatusRepository();
    const updatePaymentStatusUseCase = new UpdatePaymentStatusUseCase(
      inMemoryPaymentStatusRepository,
    );
    const expected = 'updated_name';

    await inMemoryPaymentStatusRepository.create(makePaymentStatus());
    const paymentStatus = inMemoryPaymentStatusRepository.paymentStatuses[0];

    const updatedPaymentStatus = await updatePaymentStatusUseCase.execute({
      id: paymentStatus.id,
      name: 'updated_name',
    });
    const actual = updatedPaymentStatus.name;

    expect(actual).toBe(expected);
    expect(
      updatedPaymentStatus.updatedAt == updatedPaymentStatus.createdAt,
    ).toBeFalsy();
  });

  it('should not update an unexistent payment status', async () => {
    const inMemoryPaymentStatusRepository =
      new InMemoryPaymentStatusRepository();
    const updatePaymentStatusUseCase = new UpdatePaymentStatusUseCase(
      inMemoryPaymentStatusRepository,
    );

    expect(
      async () =>
        await updatePaymentStatusUseCase.execute({
          id: 'fake_id',
          name: 'any_name',
        }),
    ).rejects.toThrow();
  });

  it('should not update a payment status with invalid name', async () => {
    const inMemoryPaymentStatusRepository =
      new InMemoryPaymentStatusRepository();
    const updatePaymentStatusUseCase = new UpdatePaymentStatusUseCase(
      inMemoryPaymentStatusRepository,
    );

    await inMemoryPaymentStatusRepository.create(makePaymentStatus());
    await inMemoryPaymentStatusRepository.create(
      makePaymentStatus('another_payment_status'),
    );

    const paymentStatus = inMemoryPaymentStatusRepository.paymentStatuses[0];

    expect(
      async () =>
        await updatePaymentStatusUseCase.execute({
          id: paymentStatus.id,
          name: 'another_payment_status',
        }),
    ).rejects.toThrow(PaymentStatusAlreadyExistsError);
  });
});
