import { Product } from '@application/entities/product/product';
import { ProductRepository } from '@application/repositories/product-repository';
import { EntityNotFoundException } from '@infra/http/exceptions/entity-not-found-exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindProductByNameUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productRepository.findByName(id);
    if (!product) {
      throw new EntityNotFoundException('Product');
    }
    return product;
  }
}
