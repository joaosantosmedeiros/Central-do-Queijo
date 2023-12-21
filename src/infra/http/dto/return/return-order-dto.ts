import { Order } from '@application/entities/order/order';
import { ReturnOrderProductDto } from './return-order-product-dto';
import { ReturnAccountDto } from './return-account-dto';
import { Account } from '@application/entities/account/account';

export class ReturnOrderDto {
  id: string;
  accountId: string;
  account?: ReturnAccountDto;
  date: Date;
  paymentId: string;
  OrderProduct?: ReturnOrderProductDto[];

  constructor(order: Order) {
    this.id = order.id;
    this.accountId = order.accountId;
    this.date = order.date;
    this.paymentId = order.paymentId;
    this.OrderProduct = order.OrderProduct
      ? order.OrderProduct.map(
          (orderProduct) => new ReturnOrderProductDto(orderProduct),
        )
      : undefined;
    this.account = order.account
      ? new ReturnAccountDto(
          new Account({
            email: order.account.email,
            name: order.account.name,
            password: order.account.password,
            isActive: order.account.isActive,
            userType: order.account.userType,
            createdAt: order.account.createdAt,
            updatedAt: order.account.updatedAt,
          }),
        )
      : undefined;
  }
}
