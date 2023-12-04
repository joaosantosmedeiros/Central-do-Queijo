import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
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
import { DeleteCartProductUseCase } from '@application/usecases/cart-product-usecases/delete-cart-product-usecase';
import { FindCartProductUseCase } from '@application/usecases/cart-product-usecases/find-cart-product-usecase';
import { UpdateCartProductUseCase } from '@application/usecases/cart-product-usecases/update-cart-product-usecase';

@Roles(UserType.User)
@Controller('cart')
export class CartController {
  constructor(
    private readonly findProductByIdUseCase: FindProductByIdUseCase,
    private readonly findCartByAccountIdUseCase: FindCartByAccountIdUseCase,
    private readonly findCartProductUseCase: FindCartProductUseCase,
    private readonly createCartUseCase: CreateCartUseCase,
    private readonly createCartProductUseCase: CreateCartProductUseCase,
    private readonly updateCartProductUseCase: UpdateCartProductUseCase,
    private readonly clearCartUseCase: ClearCartUseCase,
    private readonly deleteCartProductUseCase: DeleteCartProductUseCase,
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
    const cart = await this.createCartUseCase.execute(accountId);
    await this.findProductByIdUseCase.execute(body.productId);

    await this.createCartProductUseCase.execute(body, cart);
    return new ReturnCartDto(cart);
  }

  @Put()
  async updateProductInCart(
    @Body() body: SaveCartBody,
    @UserId() accountId: string,
  ): Promise<ReturnCartDto> {
    const cart = await this.findCartByAccountIdUseCase.execute(accountId);

    const cartProduct = await this.findCartProductUseCase.execute(
      body.productId,
      cart.id,
    );
    if (!cart.cartProduct) {
      throw new EntityNotFoundException('CartProduct');
    }

    await this.updateCartProductUseCase.execute({
      amount: body.amount,
      cartProductId: cartProduct.id,
    });

    cart.cartProduct[0].amount = body.amount;
    return new ReturnCartDto(cart);
  }

  @Delete()
  @HttpCode(204)
  async clearCart(@UserId() accountId: string) {
    const cart = await this.findCartByAccountIdUseCase.execute(accountId);

    await this.clearCartUseCase.execute(cart);
  }

  @Delete('product/:productId')
  @HttpCode(204)
  async deleteProductInCart(
    @UserId() accountId: string,
    @Param('productId') productId: string,
  ) {
    const cart = await this.findCartByAccountIdUseCase.execute(accountId);

    const cartProduct = await this.findCartProductUseCase.execute(
      productId,
      cart.id,
    );

    await this.deleteCartProductUseCase.execute(cartProduct.productId, cart.id);
  }
}
