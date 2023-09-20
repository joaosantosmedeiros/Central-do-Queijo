import { Injectable } from '@nestjs/common';
import { InMemoryCategoryRepository } from '@test/repositories/in-memory-categories-repository';
import { CategoryAlreadyExistsError } from '../errors/category-already-exists-error';

export interface UpdateCategoryRequest {
  id: string;
  name: string;
}

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    private readonly inMemoryCategoryRepository: InMemoryCategoryRepository,
  ) {}

  async execute(request: UpdateCategoryRequest) {
    const category = await this.inMemoryCategoryRepository.findById(request.id);
    if (!category) {
      throw new Error('Category not found.');
    }

    const categoryExists = this.inMemoryCategoryRepository.categories.find(
      (ctegry) => ctegry.name === request.name,
    );
    if (categoryExists) {
      throw new CategoryAlreadyExistsError();
    }

    category.name = request.name;

    return category;
  }
}
