import {
  Payment as RawPayment,
  PaymentStatus as rawPaymentStatus,
} from '@prisma/client';
import { Payment } from '@application/entities/payment/payment';

export class PrismaPaymentMapper {
  static toPrisma(payment: Payment) {
    return {
      id: payment.id,
      code: payment.code,
      discount: payment.discount,
      finalPrice: payment.finalPrice,
      price: payment.price,
      status:
        payment.status == 0 ? rawPaymentStatus.PENDING : rawPaymentStatus.DONE,
    };
  }

  static toDomain(raw: RawPayment) {
    return new Payment(
      {
        code: raw.code,
        discount: raw.discount,
        status: raw.status == rawPaymentStatus.PENDING ? 0 : 1,
        price: raw.price,
        finalPrice: raw.finalPrice,
        paymentDate: raw.paymentDate ?? undefined,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }
}
