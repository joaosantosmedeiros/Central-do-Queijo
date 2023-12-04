import { CartProduct } from '@application/entities/cart-product/cart-product';
import { CartProductRepository } from '@application/repositories/cart-product-repository';
import { EntityNotFoundException } from '@infra/http/exceptions/entity-not-found-exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindCartProductUseCase {
  constructor(private readonly cartProductRepository: CartProductRepository) {}

  async execute(productId: string, cartId: string): Promise<CartProduct> {
    const cartProduct = await this.cartProductRepository.verifyProductInCart(
      productId,
      cartId,
    );
    if (!cartProduct) {
      throw new EntityNotFoundException('CartProduct');
    }

    return cartProduct;
  }
}
