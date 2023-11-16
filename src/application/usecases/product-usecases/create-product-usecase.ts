import { Product } from '@application/entities/product/product';
import { ProductRepository } from '@application/repositories/product-repository';
import { Injectable } from '@nestjs/common';

export interface CreateProductRequest {
  name: string;
  categoryId: string;
  price: number;
  image: string;
}

@Injectable()
export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: CreateProductRequest): Promise<Product> {
    const { name, categoryId, price, image } = request;

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
