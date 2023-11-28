import { Order } from '@application/entities/order/order';

export class PrismaOrderMapper {
  static toPrisma(order: Order) {
    return {
      id: order.id,
      accountId: order.accountId,
      paymentId: order.paymentId,
    };
  }

  static toDomain(raw) {
    return new Order(
      {
        accountId: raw.accountId,
        paymentId: raw.paymentId,
        date: raw.date,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        OrderProduct: raw.OrderProduct ?? undefined,
      },
      raw.id,
    );
  }
}
