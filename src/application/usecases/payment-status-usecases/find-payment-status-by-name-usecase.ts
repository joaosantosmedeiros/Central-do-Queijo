import { PaymentStatus } from '@application/entities/payment-status/payment-status';
import { PaymentStatusRepository } from '@application/repositories/payment-status-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindPaymentStatusByNameUseCase {
  constructor(
    private readonly paymentStatusRepository: PaymentStatusRepository,
  ) {}

  async execute(name: string): Promise<PaymentStatus | null> {
    return this.paymentStatusRepository.findByName(name);
  }
}
