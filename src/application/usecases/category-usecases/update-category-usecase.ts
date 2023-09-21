import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '@application/repositories/category-repository';

export interface UpdateCategoryRequest {
  id: string;
  name: string;
}

@Injectable()
export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(request: UpdateCategoryRequest) {
    return this.categoryRepository.update(request.id, request.name);
  }
}
