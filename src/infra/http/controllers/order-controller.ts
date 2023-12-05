import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateOrderUseCase,
  FindOrderByAccountUseCase,
} from '@application/usecases/order-usecases';
import { CreateOrderProductUsingCartUseCase } from '@application/usecases/order-product-usecases';
import {
  ClearCartUseCase,
  FindCartByAccountIdUseCase,
} from '@application/usecases/cart-usecases';
import { CreateOrderBody } from '../dto/body/create-order-body';
import { UserId } from '../decorators/user-id.decorator';
import { CreatePaymentUseCase } from '@application/usecases/payment-usecases/create-payment-usecase';
import { EntityNotFoundException } from '../exceptions/entity-not-found-exception';
import { Order } from '@application/entities/order/order';
import { ListProductsUseCase } from '@application/usecases/product-usecases';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from 'src/enums/user-type.enum';
import { ReturnOrderDto } from '../dto/return/return-order-dto';

@Roles(UserType.User)
@Controller('order')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly createPaymentUseCase: CreatePaymentUseCase,
    private readonly findCartByAccountIdUseCase: FindCartByAccountIdUseCase,
    private readonly createOrderProductUsingCartUseCase: CreateOrderProductUsingCartUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
    private readonly clearCartUseCase: ClearCartUseCase,
    private readonly findOrdersByAccountUseCase: FindOrderByAccountUseCase,
  ) {}

  @Get()
  async list(@UserId() accountId: string): Promise<ReturnOrderDto[]> {
    const orders = await this.findOrdersByAccountUseCase.execute(accountId);

    return orders.map((order) => new ReturnOrderDto(order));
  }

  @Post('cart')
  @UsePipes(ValidationPipe)
  async create(
    @Body() body: CreateOrderBody,
    @UserId() accountId: string,
  ): Promise<Order> {
    const cart = await this.findCartByAccountIdUseCase.execute(accountId);
    if (!cart.cartProduct) {
      throw new EntityNotFoundException('CartProduct');
    }
    const products = await this.listProductsUseCase.execute(
      cart.cartProduct.map((cartProduct) => cartProduct.productId),
    );
    if (!products || products.length == 0) {
      throw new EntityNotFoundException('Products');
    }

    const payment = await this.createPaymentUseCase.execute(
      {
        code: body.code,
        discount: body.discount ?? 0,
      },
      products,
      cart,
    );

    const order = await this.createOrderUseCase.execute({
      accountId,
      paymentId: payment.id,
    });

    await this.createOrderProductUsingCartUseCase.execute(
      cart,
      order.id,
      products,
    );

    await this.clearCartUseCase.execute(cart);

    return order;
  }
}
