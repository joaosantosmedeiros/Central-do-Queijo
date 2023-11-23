import { OrderProduct } from '@application/entities/order-product/order-product';
import { OrderProductRepository } from '@application/repositories/order-product-repository';

export class InMemoryOrderProductsRepository implements OrderProductRepository {
  public orderProducts: OrderProduct[] = [];

  async create(orderProduct: OrderProduct): Promise<OrderProduct> {
    this.orderProducts.push(orderProduct);
    return orderProduct;
  }
}
