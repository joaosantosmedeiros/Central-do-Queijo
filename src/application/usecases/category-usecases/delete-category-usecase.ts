import { CategoryRepository } from '@application/repositories/category-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: string): Promise<void> {
    return this.categoryRepository.delete(id);
  }
}
