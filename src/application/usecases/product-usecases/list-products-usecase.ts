import { Product } from '@application/entities/product/product';
import { ProductRepository } from '@application/repositories/product-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.list();
  }
}
