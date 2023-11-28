import { Cart } from '@application/entities/cart/cart';
import { Payment } from '@application/entities/payment/payment';
import { Product } from '@application/entities/product/product';
import { PaymentRepository } from '@application/repositories/payment-repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

export interface CreatePaymentRequest {
  code: string;
  discount: number;
}

@Injectable()
export class CreatePaymentUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  generatePrice(cart: Cart, products: Product[]): number {
    if (!cart.cartProduct || cart.cartProduct.length == 0) {
      return 0;
    }

    return cart.cartProduct.reduce((acc, cartProduct) => {
      const product = products.find(
        (prodct) => prodct.id === cartProduct.productId,
      );
      if (product) {
        return acc + product?.price * cartProduct.amount;
      }
      return acc;
    }, 0);
  }

  async execute(
    request: CreatePaymentRequest,
    products: Product[],
    cart: Cart,
  ): Promise<Payment> {
    if (!cart.cartProduct) {
      throw new HttpException('The cart is empty.', HttpStatus.BAD_REQUEST);
    }

    const price = this.generatePrice(cart, products);

    const { code, discount } = request;

    const payment = new Payment({ code, discount, price });

    return this.paymentRepository.create(payment);
  }
}
