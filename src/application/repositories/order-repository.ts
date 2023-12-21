import { Order } from '@application/entities/order/order';

export abstract class OrderRepository {
  abstract create(order: Order): Promise<Order>;
  abstract list(): Promise<Order[]>;
  abstract findOrderById(orderId: string): Promise<Order | null>;
  abstract findOrdersByAccountId(accountId: string): Promise<Order[]>;
}
