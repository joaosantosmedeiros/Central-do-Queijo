import { Category } from '@application/entities/category/category';
import { CategoryRepository } from '@application/repositories/category-repository';
import { CategoryAlreadyExistsError } from '@application/usecases/errors/category-already-exists-error';

export class InMemoryCategoryRepository implements CategoryRepository {
  public categories: Category[] = [];

  async findById(id: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.id === id);
    return category ?? null;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create(newCategory: Category): Promise<void> {
    if (
      this.categories.find((category) => category.name === newCategory.name)
    ) {
      throw new CategoryAlreadyExistsError();
    }
    this.categories.push(newCategory);
  }

  async delete(id: string): Promise<void> {
    const index = this.categories.findIndex((acc) => acc.id === id);

    if (index === -1) {
      throw new Error('Category not found');
    }

    this.categories.splice(index, 1);
  }
}
