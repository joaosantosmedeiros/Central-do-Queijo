import { Order } from '@application/entities/order/order';
import { OrderRepository } from '@application/repositories/order-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaOrderMapper } from '../mappers/prisma-order-mapper';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private prismaService: PrismaService) {}

  async findOrderById(orderId: string): Promise<Order | null> {
    const order = await this.prismaService.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        OrderProduct: {
          include: {
            product: true,
          },
        },
        payment: true,
        account: true,
      },
    });

    return order ? PrismaOrderMapper.toDomain(order) : null;
  }

  async findOrdersByAccountId(accountId: string): Promise<Order[]> {
    const rawOrders = await this.prismaService.order.findMany({
      where: {
        accountId,
      },
      include: {
        OrderProduct: {
          include: {
            product: true,
          },
        },
        payment: true,
      },
    });

    return rawOrders.map((rawOrder) => PrismaOrderMapper.toDomain(rawOrder));
  }

  async list(): Promise<Order[]> {
    const orders = await this.prismaService.order.findMany({
      include: { account: true, _count: { select: { OrderProduct: true } } },
    });
    return orders.map((rawOrder) => PrismaOrderMapper.toDomain(rawOrder));
  }

  async create(order: Order): Promise<Order> {
    const rawOrder = await this.prismaService.order.create({
      data: PrismaOrderMapper.toPrisma(order),
    });

    return PrismaOrderMapper.toDomain(rawOrder);
  }
}
