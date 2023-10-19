import { Product } from '@application/entities/product/product';
import { ProductRepository } from '@application/repositories/product-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindProductByNameUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<Product | null> {
    return this.productRepository.findByName(id);
  }
}
