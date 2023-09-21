import { PaymentStatus } from '@application/entities/payment-status/payment-status';
import { PaymentStatusRepository } from '@application/repositories/payment-status-repository';
import { Injectable } from '@nestjs/common';

export interface CreatePaymentStatusRequest {
  name: string;
}

export interface CreatePaymentStatusResponse {
  paymentStatus: PaymentStatus;
}

@Injectable()
export class CreatePaymentStatusUseCase {
  constructor(private paymentStatusRepository: PaymentStatusRepository) {}

  async execute(
    request: CreatePaymentStatusRequest,
  ): Promise<CreatePaymentStatusResponse> {
    const { name } = request;

    const paymentStatus = new PaymentStatus({
      name,
    });

    await this.paymentStatusRepository.create(paymentStatus);

    return { paymentStatus };
  }
}
