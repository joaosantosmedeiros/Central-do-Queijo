import { CartProductRepository } from '@application/repositories/cart-product-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteCartProductUseCase {
  constructor(private readonly cartProductRepository: CartProductRepository) {}

  async execute(productId: string, cartId: string): Promise<void> {
    await this.cartProductRepository.delete(productId, cartId);
  }
}
