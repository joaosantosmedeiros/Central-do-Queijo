import { PaymentStatus } from '@application/entities/payment-status/payment-status';
import { PaymentStatusRepository } from '@application/repositories/payment-status-repository';
import { PaymentStatusAlreadyExistsError } from '@application/usecases/errors/payment-status-already-exists-error';

export class InMemoryPaymentStatusRepository
  implements PaymentStatusRepository
{
  public paymentStatuses: PaymentStatus[] = [];

  async findById(id: string): Promise<PaymentStatus | null> {
    const paymentStatus = this.paymentStatuses.find(
      (pay_status) => pay_status.id === id,
    );
    return paymentStatus ?? null;
  }

  async findByName(name: string): Promise<PaymentStatus | null> {
    const paymentStatus = this.paymentStatuses.find(
      (pay_status) => pay_status.name === name,
    );
    return paymentStatus ?? null;
  }

  async list(): Promise<PaymentStatus[]> {
    return this.paymentStatuses;
  }

  async create(newPaymentStatus: PaymentStatus): Promise<void> {
    if (
      this.paymentStatuses.find(
        (pay_status) => pay_status.name === newPaymentStatus.name,
      )
    ) {
      throw new PaymentStatusAlreadyExistsError();
    }
    this.paymentStatuses.push(newPaymentStatus);
  }

  async update(id: string, name: string): Promise<PaymentStatus> {
    const paymentStatus = this.paymentStatuses.find(
      (pay_status) => pay_status.id === id,
    );
    if (!paymentStatus) {
      throw new Error('Payment Status not found');
    }

    const paymentStatusExists = this.paymentStatuses.find(
      (pay_status) => pay_status.name === name,
    );

    if (paymentStatusExists) {
      throw new PaymentStatusAlreadyExistsError();
    }

    paymentStatus.name = name;

    return paymentStatus;
  }

  async delete(id: string): Promise<void> {
    const index = this.paymentStatuses.findIndex(
      (pay_status) => pay_status.id === id,
    );

    if (index === -1) {
      throw new Error('Payment Status not found');
    }

    this.paymentStatuses.splice(index, 1);
  }
}
