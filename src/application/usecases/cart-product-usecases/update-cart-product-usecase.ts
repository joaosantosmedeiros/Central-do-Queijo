import { CartProduct } from '@application/entities/cart-product/cart-product';
import { CartProductRepository } from '@application/repositories/cart-product-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateCartProductUseCase {
  constructor(private cartProductRepository: CartProductRepository) {}

  async execute(amount: number, cartProductId: string): Promise<CartProduct> {
    return this.cartProductRepository.update(amount, cartProductId);
  }
}
