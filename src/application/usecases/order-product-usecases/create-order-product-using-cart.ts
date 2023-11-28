import { Cart } from '@application/entities/cart/cart';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderProductUseCase } from './create-order-product-usecase';
import { Product } from '@application/entities/product/product';

@Injectable()
export class CreateOrderProductUsingCartUseCase {
  constructor(private createOrderProductUseCase: CreateOrderProductUseCase) {}

  async execute(cart: Cart, orderId: string, products: Product[]) {
    if (!cart.cartProduct || cart.cartProduct.length == 0) {
      throw new HttpException(
        'The cart does not have products',
        HttpStatus.BAD_REQUEST,
      );
    }

    return Promise.all(
      cart.cartProduct.map((cartProduct) =>
        this.createOrderProductUseCase.execute({
          amount: cartProduct.amount,
          orderId: orderId,
          price:
            products.find((product) => product.id == cartProduct.productId)
              ?.price || 0,
          productId: cartProduct.productId,
        }),
      ),
    );
  }
}
