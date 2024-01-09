import { CategoryRepository } from '@application/repositories/category-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { Category } from '@application/entities/category/category';
import { PrismaCategoryMapper } from '../mappers/prisma-category-mapper';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string): Promise<Category | null> {
    const raw = await this.prismaService.category.findUnique({
      where: { id },
    });

    return raw ? PrismaCategoryMapper.toDomain(raw) : null;
  }

  async findByName(name: string): Promise<Category | null> {
    const raw = await this.prismaService.category.findFirst({
      where: { name },
    });

    return raw ? PrismaCategoryMapper.toDomain(raw) : null;
  }

  async list(): Promise<Category[]> {
    const categories = await this.prismaService.category.findMany({
      include: { _count: { select: { Product: true } } },
    });

    return categories.map((category) =>
      PrismaCategoryMapper.toDomain(category),
    );
  }

  async create(category: Category): Promise<void> {
    await this.prismaService.category.create({
      data: PrismaCategoryMapper.toPrisma(category),
    });
  }

  async update(id: string, name: string): Promise<Category> {
    const raw = await this.prismaService.category.update({
      where: { id },
      data: { name },
    });

    return PrismaCategoryMapper.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.category.delete({
      where: { id },
    });
  }
}
