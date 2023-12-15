import { Product } from '@application/entities/product/product';
import { ProductRepository } from '@application/repositories/product-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(
    productsId?: string[],
    isWithRelations?: boolean,
  ): Promise<Product[]> {
    return this.productRepository.list(productsId, isWithRelations);
  }
}
