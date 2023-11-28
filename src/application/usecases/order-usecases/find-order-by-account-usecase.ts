import { OrderRepository } from '@application/repositories/order-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindOrderByAccountUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(accountId: string) {
    return this.orderRepository.findOrdersByAccountId(accountId);
  }
}
