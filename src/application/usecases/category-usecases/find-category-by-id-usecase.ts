import { Category } from '@application/entities/category/category';
import { CategoryRepository } from '@application/repositories/category-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindCategoryByIdUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: string): Promise<Category | null> {
    return this.categoryRepository.findById(id);
  }
}
