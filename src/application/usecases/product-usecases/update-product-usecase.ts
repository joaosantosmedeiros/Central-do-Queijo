import { ProductRepository } from '@application/repositories/product-repository';
import { Injectable } from '@nestjs/common';

export interface UpdateProductRequest {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  image: string;
}

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(request: UpdateProductRequest) {
    return this.productRepository.update(request.id, {
      name: request.name,
      categoryId: request.categoryId,
      image: request.image,
      price: request.price,
    });
  }
}
