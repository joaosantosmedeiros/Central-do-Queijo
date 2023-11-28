import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PaymentRepository } from '@application/repositories/payment-repository';
import { Payment } from '@application/entities/payment/payment';
import { PrismaPaymentMapper } from '../mappers/prisma-payment-mapper';

@Injectable()
export class PrismaPaymentRepository implements PaymentRepository {
  constructor(private prismaService: PrismaService) {}

  async create(payment: Payment): Promise<Payment> {
    const rawPayment = await this.prismaService.payment.create({
      data: PrismaPaymentMapper.toPrisma(payment),
    });

    return PrismaPaymentMapper.toDomain(rawPayment);
  }
}
