import { Injectable } from '@nestjs/common';
import { CategoryAlreadyExistsError } from '../errors/category-already-exists-error';
import { CategoryRepository } from '@application/repositories/category-repository';

export interface UpdateCategoryRequest {
  id: string;
  name: string;
}

@Injectable()
export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(request: UpdateCategoryRequest) {
    const category = await this.categoryRepository.findById(request.id);
    if (!category) {
      throw new Error('Category not found.');
    }

    const categoryExists = this.categoryRepository.categories.find(
      (ctegry) => ctegry.name === request.name,
    );
    if (categoryExists) {
      throw new CategoryAlreadyExistsError();
    }

    category.name = request.name;

    return category;
  }
}
