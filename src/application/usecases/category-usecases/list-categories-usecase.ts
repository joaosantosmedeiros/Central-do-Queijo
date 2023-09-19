import { Category } from '@application/entities/category/category';
import { Injectable } from '@nestjs/common';
import { InMemoryCategoryRepository } from '@test/repositories/in-memory-categories-repository';

@Injectable()
export class ListCategoriesUseCase {
  constructor(
    private readonly inMemoryCategoriesRepository: InMemoryCategoryRepository,
  ) {}

  async execute(): Promise<Category[]> {
    return this.inMemoryCategoriesRepository.list();
  }
}
