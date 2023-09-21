import { PaymentStatusRepository } from '@application/repositories/payment-status-repository';
import { Injectable } from '@nestjs/common';

export interface UpdatePaymentStatusRequest {
  id: string;
  name: string;
}

@Injectable()
export class UpdatePaymentStatusUseCase {
  constructor(
    private readonly paymentStatusRepository: PaymentStatusRepository,
  ) {}

  async execute(request: UpdatePaymentStatusRequest) {
    return this.paymentStatusRepository.update(request.id, request.name);
  }
}
