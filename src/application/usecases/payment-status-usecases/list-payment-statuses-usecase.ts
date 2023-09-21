import { PaymentStatus } from '@application/entities/payment-status/payment-status';
import { PaymentStatusRepository } from '@application/repositories/payment-status-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListPaymentStatusesUseCase {
  constructor(
    private readonly paymentStatusRepository: PaymentStatusRepository,
  ) {}

  async execute(): Promise<PaymentStatus[]> {
    return this.paymentStatusRepository.list();
  }
}
