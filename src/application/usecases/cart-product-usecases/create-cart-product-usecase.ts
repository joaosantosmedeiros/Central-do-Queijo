import { CartProduct } from '@application/entities/cart-product/cart-product';
import { Cart } from '@application/entities/cart/cart';
import { CartProductRepository } from '@application/repositories/cart-product-repository';
import { Injectable } from '@nestjs/common';

export interface CreateCartProductRequest {
  productId: string;
  amount: number;
}

@Injectable()
export class CreateCartProductUseCase {
  constructor(private cartProductRepository: CartProductRepository) {}

  async execute(
    request: CreateCartProductRequest,
    cart: Cart,
  ): Promise<CartProduct> {
    const cartProduct = await this.cartProductRepository.verifyProductInCart(
      request.productId,
      cart.id,
    );

    if (!cartProduct) {
      return this.cartProductRepository.create(
        new CartProduct({
          amount: request.amount,
          productId: request.productId,
          cartId: cart.id,
        }),
      );
    }

    const amount = request.amount + cartProduct.amount;
    return this.cartProductRepository.update(amount, cartProduct.id);
  }
}
