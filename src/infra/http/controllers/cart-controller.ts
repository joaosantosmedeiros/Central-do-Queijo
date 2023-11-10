import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from 'src/enums/user-type.enum';
import { SaveCartBody } from '../dto/body/save-cart-body';
import { CreateCartUseCase } from '@application/usecases/cart-usecases/create-cart-usecase';
import { UserId } from '../decorators/user-id.decorator';
import { CreateCartProductUseCase } from '@application/usecases/cart-product-usecases/create-cart-product-usecase';
import { FindProductByIdUseCase } from '@application/usecases/product-usecases';
import { EntityNotFoundException } from '../exceptions/entity-not-found-exception';
import { Cart } from '@application/entities/cart/cart';

@Roles(UserType.User)
@Controller('cart')
export class CartController {
  constructor(
    private readonly createCartUseCase: CreateCartUseCase,
    private readonly createCartProductUseCase: CreateCartProductUseCase,
    private readonly findProductByIdUseCase: FindProductByIdUseCase,
  ) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createCart(
    @Body() body: SaveCartBody,
    @UserId() accountId: string,
  ): Promise<Cart> {
    const { cart } = await this.createCartUseCase.execute(accountId, true);
    const product = await this.findProductByIdUseCase.execute(body.productId);

    if (!product) {
      throw new EntityNotFoundException('Product');
    }

    await this.createCartProductUseCase.execute(body, cart);
    return cart;
  }
}
