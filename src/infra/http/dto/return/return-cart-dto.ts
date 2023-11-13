import { Cart } from '@application/entities/cart/cart';
import { ReturnCartProductDto } from './return-cart-product-dto';

export class ReturnCartDto {
  id: string;
  cartProduct: ReturnCartProductDto[];

  constructor(cart: Cart) {
    this.id = cart.id;
    this.cartProduct = cart.cartProduct
      ? cart.cartProduct.map(
          (cartProduct) => new ReturnCartProductDto(cartProduct),
        )
      : [];
  }
}
