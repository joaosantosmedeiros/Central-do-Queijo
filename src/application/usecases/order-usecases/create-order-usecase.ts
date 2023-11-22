import { Order } from '@application/entities/order/order';
import { OrderRepository } from '@application/repositories/order-repository';
import { Injectable } from '@nestjs/common';

export interface CreateOrderRequest {
  accountId: string;
  paymentId: string;
}

@Injectable()
export class CreateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(request: CreateOrderRequest): Promise<Order> {
    const { accountId, paymentId } = request;

    const order = new Order({ accountId, paymentId });

    return this.orderRepository.create(order);
  }
}
