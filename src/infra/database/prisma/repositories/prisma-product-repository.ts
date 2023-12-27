import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@application/repositories/product-repository';
import { Product } from '@application/entities/product/product';
import { PrismaProductMapper } from '../mappers/prisma-product-mapper';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string): Promise<Product | null> {
    const raw = await this.prismaService.product.findUnique({
      where: { id },
      include: { category: true },
    });

    return raw ? PrismaProductMapper.toDomain(raw) : null;
  }

  async findByName(name: string): Promise<Product | null> {
    const raw = await this.prismaService.product.findFirst({
      where: { name },
      include: { category: true },
    });

    return raw ? PrismaProductMapper.toDomain(raw) : null;
  }

  async list(
    productsId?: string[],
    withRelations?: boolean,
  ): Promise<Product[]> {
    let findOptions = {};

    if (productsId && productsId.length > 0) {
      findOptions = {
        where: {
          id: { in: productsId },
        },
      };
    }

    if (withRelations) {
      findOptions = {
        ...findOptions,
        include: {
          category: true,
        },
      };
    }

    const products = await this.prismaService.product.findMany(findOptions);

    return products.map((product) => PrismaProductMapper.toDomain(product));
  }

  async create(product: Product): Promise<Product> {
    const createdProduct = await this.prismaService.product.create({
      data: PrismaProductMapper.toPrisma(product),
      include: { category: true },
    });

    return PrismaProductMapper.toDomain(createdProduct);
  }

  async update(
    id: string,
    props: { name: string; categoryId: string; price: number; image: string },
  ): Promise<Product> {
    const raw = await this.prismaService.product.update({
      where: { id },
      data: props,
      include: { category: true },
    });

    return PrismaProductMapper.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.product.delete({
      where: { id },
    });
  }
}
