import { Category } from '@application/entities/category/category';
import { CategoryRepository } from '@application/repositories/category-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindCategoryByNameUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(name: string): Promise<Category | null> {
    return this.categoryRepository.findByName(name);
  }
}
