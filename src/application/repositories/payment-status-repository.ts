import { PaymentStatus } from '@application/entities/payment-status/payment-status';

export abstract class PaymentStatusRepository {
  public paymentStatuses: PaymentStatus[];

  abstract findById(id: string): Promise<PaymentStatus | null>;
  abstract findByName(name: string): Promise<PaymentStatus | null>;
  abstract list(): Promise<PaymentStatus[]>;
  abstract create(paymentStatus: PaymentStatus): Promise<void>;
  abstract update(id: string, name: string): Promise<PaymentStatus>;
  abstract delete(id: string): Promise<void>;
}
