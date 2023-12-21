import { Account } from '@application/entities/account/account';
import { OrderProduct } from '@application/entities/order-product/order-product';
import { Order } from '@application/entities/order/order';
import { Payment } from '@application/entities/payment/payment';

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
        OrderProduct: raw.OrderProduct
          ? raw.OrderProduct.map(
              (op) =>
                new OrderProduct(
                  {
                    amount: op.amount,
                    orderId: op.orderId,
                    price: op.price,
                    productId: op.productId,
                    createdAt: op.createdAt,
                    updatedAt: op.updatedAt,
                    product: op.product,
                  },
                  op.id,
                ),
            )
          : undefined,
        account: raw.account
          ? new Account(
              {
                email: raw.account.email,
                name: raw.account.name,
                password: raw.account.password,
                userType: raw.account.userType,
                createdAt: raw.account.createdAt,
                updatedAt: raw.account.updatedAt,
                isActive: raw.account.isActive,
              },
              raw.account.id,
            )
          : undefined,
        payment: raw.payment
          ? new Payment(
              {
                code: raw.payment.code,
                discount: raw.payment.discount,
                price: raw.payment.price,
                finalPrice: raw.payment.finalPrice,
                status: raw.payment.status,
                paymentDate: raw.payment.paymentDate,
                createdAt: raw.payment.createdAt,
                updatedAt: raw.payment.updatedAt,
              },
              raw.payment.id,
            )
          : undefined,
      },
      raw.id,
    );
  }
}
