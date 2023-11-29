import { Category } from '@application/entities/category/category';
import { CategoryRepository } from '@application/repositories/category-repository';
import { Injectable } from '@nestjs/common';
import { FindCategoryByNameUseCase } from './find-category-by-name-usecase';
import { CategoryAlreadyExistsException } from '@infra/http/exceptions/category-already-exists-exception';

export interface CreateCategoryRequest {
  name: string;
}

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private findCategoryByName: FindCategoryByNameUseCase,
  ) {}

  async execute(request: CreateCategoryRequest): Promise<Category> {
    const { name } = request;

    const categoryExists = await this.findCategoryByName.execute(name);
    if (categoryExists) {
      throw new CategoryAlreadyExistsException();
    }

    const category = new Category({
      name,
    });

    await this.categoryRepository.create(category);

    return category;
  }
}
