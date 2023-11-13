import { Cart } from '@application/entities/cart/cart';
import { CartRepository } from '@application/repositories/cart-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindCartByAccountIdUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(accountId: string): Promise<Cart | null> {
    return this.cartRepository.findCartByUserId(accountId, true);
  }
}
