import { Category } from '@application/entities/category/category';

export abstract class CategoryRepository {
  public categories: Category[];

  abstract findById(id: string): Promise<Category | null>;
  abstract list(): Promise<Category[]>;
  abstract create(category: Category): Promise<void>;
  abstract update(id: string, name: string): Promise<Category>;
  abstract delete(id: string): Promise<void>;
}
