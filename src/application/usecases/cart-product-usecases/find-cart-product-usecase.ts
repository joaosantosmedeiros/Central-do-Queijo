import { CartProduct } from '@application/entities/cart-product/cart-product';
import { CartProductRepository } from '@application/repositories/cart-product-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindCartProductUseCase {
  constructor(private readonly cartProductRepository: CartProductRepository) {}

  async execute(
    productId: string,
    cartId: string,
  ): Promise<CartProduct | null> {
    return this.cartProductRepository.verifyProductInCart(productId, cartId);
  }
}
