import { ProductRepository } from '@application/repositories/product-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<void> {
    return this.productRepository.delete(id);
  }
}
