import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@application/repositories/product-repository';
import { Product } from '@application/entities/product/product';
import { PrismaProductMapper } from '../mappers/prisma-product-mapper';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private prismaService: PrismaService) {}
  public products: Product[];

  async findById(id: string): Promise<Product | null> {
    const raw = await this.prismaService.product.findUnique({
      where: { id },
    });

    return raw ? PrismaProductMapper.toDomain(raw) : null;
  }

  async findByName(name: string): Promise<Product | null> {
    const raw = await this.prismaService.product.findFirst({
      where: { name },
    });

    return raw ? PrismaProductMapper.toDomain(raw) : null;
  }

  async list(): Promise<Product[]> {
    const products = await this.prismaService.product.findMany({});

    return products.map((product) => PrismaProductMapper.toDomain(product));
  }

  async create(product: Product): Promise<void> {
    await this.prismaService.product.create({
      data: PrismaProductMapper.toPrisma(product),
    });
  }

  async update(
    id: string,
    props: { name: string; categoryId: string; price: number; image: string },
  ): Promise<Product> {
    const raw = await this.prismaService.product.update({
      where: { id },
      data: props,
    });

    return PrismaProductMapper.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.product.delete({
      where: { id },
    });
  }
}
