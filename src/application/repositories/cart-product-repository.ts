import { CartProduct } from '@application/entities/cart-product/cart-product';

export abstract class CartProductRepository {
  abstract verifyProductInCart(
    productId: string,
    cartId: string,
  ): Promise<CartProduct | null>;
  abstract create(cartProduct: CartProduct): Promise<CartProduct>;
  abstract update(amount: number, id: string): Promise<CartProduct>;
}
