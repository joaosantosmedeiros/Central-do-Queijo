import { Product } from '@application/entities/product/product';
import { PrismaCategoryMapper } from './prisma-category-mapper';

export class PrismaProductMapper {
  static toPrisma(product: Product) {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      image: product.image,
    };
  }

  static toDomain(raw: any) {
    return new Product(
      {
        name: raw.name,
        categoryId: raw.categoryId,
        price: raw.price,
        image: raw.image,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        category: raw.category
          ? PrismaCategoryMapper.toDomain(raw.category)
          : undefined,
      },
      raw.id,
    );
  }
}
