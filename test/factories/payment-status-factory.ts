import { PaymentStatus } from '@application/entities/payment-status/payment-status';
import { randomUUID } from 'crypto';

export function makePaymentStatus(
  name = 'any_name',
  createdAt = new Date(),
  updatedAt = new Date(),
  id = randomUUID(),
) {
  return new PaymentStatus({ name, createdAt, updatedAt }, id);
}
