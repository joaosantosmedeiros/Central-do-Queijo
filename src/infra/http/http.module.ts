import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { AccountController } from './controllers/account-controller';
import {
  CreateAccountUseCase,
  DeleteAccountUseCase,
  FindAccountByEmailUseCase,
  FindAccountByIdUseCase,
  ListAllAccountsUseCase,
  UpdateAccountUseCase,
} from '@application/usecases/account-usecases';
import { CategoryController } from './controllers/category-controller';
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  FindCategoryByIdUseCase,
  FindCategoryByNameUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from '@application/usecases/category-usecases';
import { ProductController } from './controllers/product-controller';
import {
  CreateProductUseCase,
  DeleteProductUseCase,
  FindProductByIdUseCase,
  ListProductsUseCase,
  UpdateProductUseCase,
} from '@application/usecases/product-usecases';
import { AuthModule } from './auth/auth.module';
import { CartController } from './controllers/cart-controller';
import { OrderController } from './controllers/order-controller';
import { CreatePaymentUseCase } from '@application/usecases/payment-usecases/create-payment-usecase';
import {
  ClearCartUseCase,
  CreateCartUseCase,
  FindCartByAccountIdUseCase,
} from '@application/usecases/cart-usecases';
import {
  CreateCartProductUseCase,
  DeleteCartProductUseCase,
  FindCartProductUseCase,
  UpdateCartProductUseCase,
} from '@application/usecases/cart-product-usecases';
import {
  CreateOrderProductUseCase,
  CreateOrderProductUsingCartUseCase,
} from '@application/usecases/order-product-usecases';
import {
  CreateOrderUseCase,
  FindOrderByAccountUseCase,
} from '@application/usecases/order-usecases';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [
    AccountController,
    CategoryController,
    ProductController,
    CartController,
    OrderController,
  ],
  providers: [
    CreateAccountUseCase,
    ListAllAccountsUseCase,
    FindAccountByEmailUseCase,
    FindAccountByIdUseCase,
    UpdateAccountUseCase,
    DeleteAccountUseCase,

    CreateCategoryUseCase,
    ListCategoriesUseCase,
    FindCategoryByIdUseCase,
    FindCategoryByNameUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,

    CreateProductUseCase,
    ListProductsUseCase,
    FindProductByIdUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,

    CreateCartUseCase,
    CreateCartProductUseCase,
    FindCartByAccountIdUseCase,
    ClearCartUseCase,
    DeleteCartProductUseCase,
    FindCartProductUseCase,
    UpdateCartProductUseCase,

    CreateOrderUseCase,
    CreatePaymentUseCase,
    CreateOrderProductUseCase,
    CreateOrderProductUsingCartUseCase,
    FindOrderByAccountUseCase,
  ],
})
export class HttpModule {}
