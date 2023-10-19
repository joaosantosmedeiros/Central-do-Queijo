import { Product } from '@application/entities/product/product';
import { Product as RawProduct } from '@prisma/client';

export class PrismaProductMapper {
  static toPrisma(product: Product) {
    return {
      id: product.id,
      name: product.name,
      categoryId: product.categoryId,
    };
  }

  static toDomain(raw: RawProduct) {
    return new Product(
      {
        name: raw.name,
        categoryId: raw.categoryId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }
}
