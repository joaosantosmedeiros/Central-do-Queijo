import { CartProduct } from '@application/entities/cart-product/cart-product';
import { CartProductRepository } from '@application/repositories/cart-product-repository';
import { Injectable } from '@nestjs/common';

export interface UpdateCartProductRequest {
  amount: number;
  cartProductId: string;
}

@Injectable()
export class UpdateCartProductUseCase {
  constructor(private cartProductRepository: CartProductRepository) {}

  async execute(request: UpdateCartProductRequest): Promise<CartProduct> {
    return this.cartProductRepository.update(
      request.amount,
      request.cartProductId,
    );
  }
}
