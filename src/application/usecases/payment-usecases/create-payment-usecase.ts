import { Payment } from '@application/entities/payment/payment';
import { PaymentRepository } from '@application/repositories/payment-repository';
import { Injectable } from '@nestjs/common';

export interface CreatePaymentRequest {
  code: string;
  discount: number;
  price: number;
}

@Injectable()
export class CreatePaymentUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(request: CreatePaymentRequest): Promise<Payment> {
    const { code, discount, price } = request;

    const payment = new Payment({ code, discount, price });

    return this.paymentRepository.create(payment);
  }
}
