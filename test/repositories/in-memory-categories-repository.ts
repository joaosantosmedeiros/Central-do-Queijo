import { Category } from '@application/entities/category/category';
import { CategoryRepository } from '@application/repositories/category-repository';
import { EntityAlreadyExistsError } from '@application/usecases/errors/category-already-exists-error';

export class InMemoryCategoryRepository implements CategoryRepository {
  public categories: Category[] = [];

  async findById(id: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.id === id);
    return category ?? null;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.name === name);
    return category ?? null;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create(newCategory: Category): Promise<void> {
    if (
      this.categories.find((category) => category.name === newCategory.name)
    ) {
      throw new EntityAlreadyExistsError('Category');
    }
    this.categories.push(newCategory);
  }

  async update(id: string, name: string): Promise<Category> {
    const category = this.categories.find((ctegory) => ctegory.id === id);
    if (!category) {
      throw new Error('Category not found');
    }

    const categoryExists = this.categories.find(
      (ctegory) => ctegory.name === name,
    );

    if (categoryExists) {
      throw new EntityAlreadyExistsError('Category');
    }

    category.name = name;

    return category;
  }

  async delete(id: string): Promise<void> {
    const index = this.categories.findIndex((acc) => acc.id === id);

    if (index === -1) {
      throw new Error('Category not found');
    }

    this.categories.splice(index, 1);
  }
}
