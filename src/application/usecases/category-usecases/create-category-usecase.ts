import { Category } from '@application/entities/category/category';
import { CategoryRepository } from '@application/repositories/category-repository';
import { Injectable } from '@nestjs/common';

export interface CreateCategoryRequest {
  name: string;
}

@Injectable()
export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(request: CreateCategoryRequest): Promise<Category> {
    const { name } = request;

    const category = new Category({
      name,
    });

    await this.categoryRepository.create(category);

    return category;
  }
}
