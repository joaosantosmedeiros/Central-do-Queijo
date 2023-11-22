import { Payment } from '@application/entities/payment/payment';

export abstract class PaymentRepository {
  abstract create(payment: Payment): Promise<Payment>;
}
