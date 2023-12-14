import { CartProduct } from '@application/entities/cart-product/cart-product';
import { CartProductRepository } from '@application/repositories/cart-product-repository';
import { BadRequestException, Injectable } from '@nestjs/common';

export interface UpdateCartProductRequest {
  amount: number;
  cartProductId: string;
}

@Injectable()
export class UpdateCartProductUseCase {
  constructor(private cartProductRepository: CartProductRepository) {}

  async execute(request: UpdateCartProductRequest): Promise<CartProduct> {
    if (request.amount < 1) {
      throw new BadRequestException('Amount must be positive.');
    }

    return this.cartProductRepository.update(
      request.amount,
      request.cartProductId,
    );
  }
}
