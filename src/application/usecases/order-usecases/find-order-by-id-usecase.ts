import { Order } from '@application/entities/order/order';
import { OrderRepository } from '@application/repositories/order-repository';
import { EntityNotFoundException } from '@infra/http/exceptions/entity-not-found-exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindOrderByIdUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findOrderById(orderId);
    if (!order) {
      throw new EntityNotFoundException('Order');
    }
    return order;
  }
}
