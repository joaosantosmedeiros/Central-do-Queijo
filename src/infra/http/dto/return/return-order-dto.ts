import { Order } from '@application/entities/order/order';
import { ReturnOrderProductDto } from './return-order-product-dto';

export class ReturnOrderDto {
  id: string;
  accountId: string;
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
  }
}
