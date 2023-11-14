import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
import { ReturnCartDto } from '../dto/return/return-cart-dto';
import { FindCartByAccountIdUseCase } from '@application/usecases/cart-usecases/find-cart-by-account-id-usecase';
import { ClearCartUseCase } from '@application/usecases/cart-usecases/clear-cart-usecase';

@Roles(UserType.User)
@Controller('cart')
export class CartController {
  constructor(
    private readonly createCartUseCase: CreateCartUseCase,
    private readonly createCartProductUseCase: CreateCartProductUseCase,
    private readonly findProductByIdUseCase: FindProductByIdUseCase,
    private readonly findCartByAccountIdUseCase: FindCartByAccountIdUseCase,
    private readonly clearCartUseCase: ClearCartUseCase,
  ) {}

  @UsePipes(ValidationPipe)
  @Get()
  async findCartByAccountId(
    @UserId() accountId: string,
  ): Promise<ReturnCartDto | null> {
    const cart = await this.findCartByAccountIdUseCase.execute(accountId);
    return cart ? new ReturnCartDto(cart) : null;
  }

  @Post()
  async createCart(
    @Body() body: SaveCartBody,
    @UserId() accountId: string,
  ): Promise<ReturnCartDto> {
    const { cart } = await this.createCartUseCase.execute(accountId);
    const product = await this.findProductByIdUseCase.execute(body.productId);

    if (!product) {
      throw new EntityNotFoundException('Product');
    }

    await this.createCartProductUseCase.execute(body, cart);
    return new ReturnCartDto(cart);
  }

  @Delete()
  @HttpCode(204)
  async clearCart(@UserId() accountId: string) {
    const cart = await this.findCartByAccountIdUseCase.execute(accountId);

    if (!cart) {
      throw new EntityNotFoundException('Cart');
    }

    await this.clearCartUseCase.execute(cart);
  }
}
