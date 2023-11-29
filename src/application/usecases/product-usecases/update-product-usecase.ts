import { Product } from '@application/entities/product/product';
import { ProductRepository } from '@application/repositories/product-repository';
import { Injectable } from '@nestjs/common';
import { FindCategoryByIdUseCase } from '../category-usecases';

export interface UpdateProductRequest {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  image: string;
}

@Injectable()
export class UpdateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly findCategoryById: FindCategoryByIdUseCase,
  ) {}

  async execute(request: UpdateProductRequest): Promise<Product> {
    const category = await this.findCategoryById.execute(request.categoryId);

    return this.productRepository.update(request.id, {
      name: request.name,
      categoryId: category.id,
      image: request.image,
      price: request.price,
    });
  }
}
