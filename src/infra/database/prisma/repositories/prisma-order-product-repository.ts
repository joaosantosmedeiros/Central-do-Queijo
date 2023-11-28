import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OrderProductRepository } from '@application/repositories/order-product-repository';
import { OrderProduct } from '@application/entities/order-product/order-product';
import { PrismaOrderProductMapper } from '../mappers/prisma-order-product-mapper';

@Injectable()
export class PrismaOrderProductRepository implements OrderProductRepository {
  constructor(private prismaService: PrismaService) {}

  async create(orderProduct: OrderProduct): Promise<any> {
    const rawOrderProduct = await this.prismaService.orderProduct.create({
      data: PrismaOrderProductMapper.toPrisma(orderProduct),
    });

    return PrismaOrderProductMapper.toDomain(rawOrderProduct);
  }
}
