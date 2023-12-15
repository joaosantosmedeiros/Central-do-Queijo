import { Category } from '@application/entities/category/category';

export class PrismaCategoryMapper {
  static toPrisma(category: Category) {
    return {
      id: category.id,
      name: category.name,
    };
  }

  static toDomain(raw: any) {
    return new Category(
      {
        name: raw.name,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        _count: raw._count,
      },
      raw.id,
    );
  }
}
