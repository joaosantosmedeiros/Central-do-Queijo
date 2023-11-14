import { CartProduct } from '@application/entities/cart-product/cart-product';
import { CartProductRepository } from '@application/repositories/cart-product-repository';

export class InMemoryCartProductRepository implements CartProductRepository {
  public cartProducts: CartProduct[] = [];

  async verifyProductInCart(
    productId: string,
    cartId: string,
  ): Promise<CartProduct | null> {
    const cartProduct = this.cartProducts.find(
      (cartProduct) =>
        cartProduct.cartId == cartId && cartProduct.productId == productId,
    );

    return cartProduct ?? null;
  }

  async create(cartProduct: CartProduct): Promise<CartProduct> {
    this.cartProducts.push(cartProduct);
    return cartProduct;
  }

  async update(amount: number, id: string): Promise<CartProduct> {
    const cartProduct = this.cartProducts.find(
      (cartProduct) => cartProduct.id == id,
    );

    if (!cartProduct) {
      throw new Error('CartProduct does not exists');
    }

    cartProduct.amount = amount;
    return cartProduct;
  }

  async delete(productId: string, cartId: string): Promise<void> {
    const cartProductIndex = this.cartProducts.findIndex(
      (cartProduct) =>
        cartProduct.productId === productId && cartProduct.cartId === cartId,
    );

    if (cartProductIndex == -1) {
      throw new Error('CartProduct not found.');
    }

    this.cartProducts.splice(cartProductIndex, 1);
  }
}
