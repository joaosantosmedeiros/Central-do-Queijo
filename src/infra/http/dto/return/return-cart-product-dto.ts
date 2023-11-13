import { CartProduct } from '@application/entities/cart-product/cart-product';
import { ReturnProductDto } from './return-product-dto';

export class ReturnCartProductDto {
  id: string;
  cartId: string;
  productId: string;
  amount: number;
  product: ReturnProductDto | undefined;

  constructor(cartProduct: CartProduct) {
    this.id = cartProduct.id;
    this.cartId = cartProduct.cartId;
    this.productId = cartProduct.productId;
    this.amount = cartProduct.amount;
    this.product = cartProduct.product
      ? new ReturnProductDto(cartProduct.product)
      : undefined;
  }
}
