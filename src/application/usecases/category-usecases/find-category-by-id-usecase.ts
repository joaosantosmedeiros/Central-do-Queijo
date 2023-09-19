import { Category } from '@application/entities/category/category';
import { Injectable } from '@nestjs/common';
import { InMemoryCategoryRepository } from '@test/repositories/in-memory-categories-repository';

@Injectable()
export class FindCategoryByIdUseCase {
  constructor(
    private readonly inMemoryCategoriesRepository: InMemoryCategoryRepository,
  ) {}

  async execute(id: string): Promise<Category | null> {
    return this.inMemoryCategoriesRepository.findById(id);
  }
}
