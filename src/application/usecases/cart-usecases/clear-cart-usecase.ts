import { Cart } from '@application/entities/cart/cart';
import { CartRepository } from '@application/repositories/cart-repository';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ClearCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(cart: Cart): Promise<void> {
    await this.cartRepository.disable(cart.id);
  }
}
