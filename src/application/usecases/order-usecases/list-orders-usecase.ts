import { Order } from '@application/entities/order/order';
import { OrderRepository } from '@application/repositories/order-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListOrdersUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<Order[]> {
    return this.orderRepository.list();
  }
}
