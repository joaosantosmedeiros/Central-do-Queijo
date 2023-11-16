import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '@application/repositories/category-repository';
import { Category } from '@application/entities/category/category';

export interface UpdateCategoryRequest {
  id: string;
  name: string;
}

@Injectable()
export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(request: UpdateCategoryRequest): Promise<Category> {
    return this.categoryRepository.update(request.id, request.name);
  }
}
