import { OrderProduct } from '@application/entities/order-product/order-product';

export abstract class OrderProductRepository {
  abstract create(orderProduct: OrderProduct): Promise<OrderProduct>;
}
