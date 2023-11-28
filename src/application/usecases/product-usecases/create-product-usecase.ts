import { Product } from '@application/entities/product/product';
import { ProductRepository } from '@application/repositories/product-repository';
import { Injectable } from '@nestjs/common';
import { FindCategoryByIdUseCase } from '../category-usecases';

export interface CreateProductRequest {
  name: string;
  categoryId: string;
  price: number;
  image: string;
}

@Injectable()
export class CreateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private findCategoryById: FindCategoryByIdUseCase,
  ) {}

  async execute(request: CreateProductRequest): Promise<Product> {
    const { name, categoryId, price, image } = request;

    await this.findCategoryById.execute(categoryId);

    const product = new Product({
      name,
      categoryId,
      image,
      price,
    });

    await this.productRepository.create(product);

    return product;
  }
}
