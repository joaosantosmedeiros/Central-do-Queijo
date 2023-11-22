import { Payment } from '@application/entities/payment/payment';
import { PaymentRepository } from '@application/repositories/payment-repository';

export class InMemoryPaymentsRepository implements PaymentRepository {
  public payments: Payment[] = [];

  async create(payment: Payment): Promise<Payment> {
    this.payments.push(payment);
    return payment;
  }
}
