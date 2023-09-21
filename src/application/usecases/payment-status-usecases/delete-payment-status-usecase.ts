import { PaymentStatusRepository } from '@application/repositories/payment-status-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeletePaymentStatusUseCase {
  constructor(
    private readonly paymentStatusRepository: PaymentStatusRepository,
  ) {}

  async execute(id: string): Promise<void> {
    return this.paymentStatusRepository.delete(id);
  }
}
