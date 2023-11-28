import { OrderProduct } from '@application/entities/order-product/order-product';
import { OrderProduct as RawOrderProduct } from '@prisma/client';

export class PrismaOrderProductMapper {
  static toPrisma(orderProduct: OrderProduct) {
    return {
      amount: orderProduct.amount,
      price: orderProduct.price,
      orderId: orderProduct.orderId,
      productId: orderProduct.productId,
    };
  }

  static toDomain(raw: RawOrderProduct) {
    return new OrderProduct(
      {
        amount: raw.amount,
        price: raw.price,
        orderId: raw.orderId,
        productId: raw.productId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }
}
