import { Cart } from '../cart/cart';
import { Product } from '../product/product';

export class CartProduct {
  id: string;
  cartId: string;
  cart?: Cart;
  productId: string;
  product?: Product;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}
