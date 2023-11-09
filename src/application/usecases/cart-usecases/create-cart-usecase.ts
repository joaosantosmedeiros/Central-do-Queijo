import { Cart } from '@application/entities/cart/cart';
import { CartRepository } from '@application/repositories/cart-repository';
import { Injectable } from '@nestjs/common';

export interface CreateCartRequest {
  productId: string;
  amount: number;
}

export interface CreateCartResponse {
  cart: Cart;
}

@Injectable()
export class CreateCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(accountId: string): Promise<CreateCartResponse> {
    const cart = await this.cartRepository.verifyActiveCart(accountId);

    if (!cart) {
      const createdCart = await this.cartRepository.create(
        new Cart({ accountId }),
      );
      return { cart: createdCart };
    }

    return { cart };
  }
}
