import { Cart } from '@application/entities/cart/cart';
import { CartRepository } from '@application/repositories/cart-repository';
import { EntityNotFoundException } from '@infra/http/exceptions/entity-not-found-exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindCartByAccountIdUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(accountId: string): Promise<Cart> {
    const cart = await this.cartRepository.findCartByUserId(accountId, true);
    if (!cart) {
      throw new EntityNotFoundException('Cart');
    }
    return cart;
  }
}
