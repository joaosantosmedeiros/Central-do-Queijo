import { Product } from '@application/entities/product/product';
import { ProductRepository } from '@application/repositories/product-repository';
import { Injectable } from '@nestjs/common';

export interface CreateProductRequest {
  name: string;
  categoryId: string;
  price: number;
}

export interface CreateProductResponse {
  product: Product;
}

@Injectable()
export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: CreateProductRequest): Promise<CreateProductResponse> {
    const { name, categoryId, price } = request;

    const product = new Product({
      name,
      categoryId,
      price,
    });

    await this.productRepository.create(product);

    return { product };
  }
}
