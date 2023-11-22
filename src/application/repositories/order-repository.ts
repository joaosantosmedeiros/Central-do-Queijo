import { Order } from '@application/entities/order/order';

export abstract class OrderRepository {
  abstract create(order: Order): Promise<Order>;
}
