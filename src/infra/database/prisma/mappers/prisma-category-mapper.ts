import { Category } from '@application/entities/category/category';

import { Category as RawCategory } from '@prisma/client';

export class PrismaCategoryMapper {
  static toPrisma(category: Category) {
    return {
      id: category.id,
      name: category.name,
    };
  }

  static toDomain(raw: RawCategory) {
    return new Category(
      {
        name: raw.name,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }
}
