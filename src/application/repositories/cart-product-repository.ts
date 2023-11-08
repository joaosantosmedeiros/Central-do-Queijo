import { CartProduct } from '@prisma/client';

export abstract class CartProductRepository {
  abstract verifyProductInCart(
    productId: string,
    cartId: string,
  ): Promise<CartProduct | null>;
  abstract create(
    productId: string,
    cartId: string,
    amount: number,
  ): Promise<CartProduct>;
  abstract update(amount: number, id: string): Promise<CartProduct>;
}
