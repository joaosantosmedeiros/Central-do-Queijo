import { Order } from '@application/entities/order/order';
import { ReturnOrderProductDto } from './return-order-product-dto';
import { ReturnAccountDto } from './return-account-dto';
import { ReturnPaymentDto } from './return-payment-dto';

export class ReturnOrderDto {
  id: string;
  accountId: string;
  account?: ReturnAccountDto;
  date: Date;
  paymentId: string;
  payment?: ReturnPaymentDto;
  productAmount?: number;
  OrderProduct?: ReturnOrderProductDto[];

  constructor(order: Order) {
    this.id = order.id;
    this.accountId = order.accountId;
    this.date = order.date;
    this.paymentId = order.paymentId;
    this.productAmount = order.productsAmount ?? undefined;
    this.OrderProduct = order.OrderProduct
      ? order.OrderProduct.map(
          (orderProduct) => new ReturnOrderProductDto(orderProduct),
        )
      : undefined;
    this.account = order.account
      ? new ReturnAccountDto(order.account)
      : undefined;
    this.payment = order.payment
      ? new ReturnPaymentDto(order.payment)
      : undefined;
  }
}
