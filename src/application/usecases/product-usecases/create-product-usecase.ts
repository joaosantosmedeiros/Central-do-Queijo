import { Product } from '@application/entities/product/product';
import { ProductRepository } from '@application/repositories/product-repository';
import { Injectable } from '@nestjs/common';

export interface CreateProductRequest {
  name: string;
  categoryId: string;
}

export interface CreateProductResponse {
  product: Product;
}

@Injectable()
export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: CreateProductRequest): Promise<CreateProductResponse> {
    const { name, categoryId } = request;

    const product = new Product({
      name,
      categoryId,
    });

    await this.productRepository.create(product);

    return { product };
  }
}
