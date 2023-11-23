import { OrderProduct } from '@application/entities/order-product/order-product';
import { OrderProductRepository } from '@application/repositories/order-product-repository';
import { Injectable } from '@nestjs/common';

export interface CreateOrderProductRequest {
  productId: string;
  orderId: string;
  price: number;
  amount: number;
}

@Injectable()
export class CreateOrderProductUseCase {
  constructor(
    private readonly orderProductRepository: OrderProductRepository,
  ) {}

  async execute(request: CreateOrderProductRequest): Promise<OrderProduct> {
    const { amount, price, productId, orderId } = request;
    const orderProduct = new OrderProduct({
      amount,
      orderId,
      price,
      productId,
    });

    return this.orderProductRepository.create(orderProduct);
  }
}
