import { OrderProduct } from '@application/entities/order-product/order-product';
import { ReturnProductDto } from './return-product-dto';

export class ReturnOrderProductDto {
  id: string;
  productId: string;
  orderId: string;
  amount: number;
  price: number;
  product?: ReturnProductDto;

  constructor(orderProduct: OrderProduct) {
    this.id = orderProduct.id;
    this.productId = orderProduct.productId;
    this.orderId = orderProduct.orderId;
    this.amount = orderProduct.amount;
    this.price = orderProduct.price;
    this.product = orderProduct.product
      ? new ReturnProductDto(orderProduct.product)
      : undefined;
  }
}
