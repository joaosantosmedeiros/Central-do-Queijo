import { PaymentStatus } from '@application/entities/payment-status/payment-status';
import { PaymentStatusRepository } from '@application/repositories/payment-status-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindPaymentStatusByIdUseCase {
  constructor(
    private readonly paymentStatusRepository: PaymentStatusRepository,
  ) {}

  async execute(id: string): Promise<PaymentStatus | null> {
    return this.paymentStatusRepository.findById(id);
  }
}
