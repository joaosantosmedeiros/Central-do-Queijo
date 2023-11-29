import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '@application/repositories/category-repository';
import { Category } from '@application/entities/category/category';
import { CategoryAlreadyExistsException } from '@infra/http/exceptions/category-already-exists-exception';
import { FindCategoryByNameUseCase } from './find-category-by-name-usecase';

export interface UpdateCategoryRequest {
  id: string;
  name: string;
}

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly findCategoryByName: FindCategoryByNameUseCase,
  ) {}

  async execute(request: UpdateCategoryRequest): Promise<Category> {
    const categoryExists = await this.findCategoryByName.execute(request.name);
    if (categoryExists) {
      throw new CategoryAlreadyExistsException();
    }

    return this.categoryRepository.update(request.id, request.name);
  }
}
