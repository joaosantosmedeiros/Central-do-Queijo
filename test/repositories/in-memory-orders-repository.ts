import { Order } from '@application/entities/order/order';
import { OrderRepository } from '@application/repositories/order-repository';

export class InMemoryOrdersRepository implements OrderRepository {
  public orders: Order[] = [];

  async findOrderById(orderId: string): Promise<Order | null> {
    return this.orders.find((order) => order.id === orderId) ?? null;
  }

  async findOrdersByAccountId(accountId: string): Promise<Order[]> {
    return this.orders.filter((order) => order.accountId == accountId);
  }

  async list(): Promise<Order[]> {
    return this.orders;
  }

  async create(order: Order): Promise<Order> {
    this.orders.push(order);
    return order;
  }
}
