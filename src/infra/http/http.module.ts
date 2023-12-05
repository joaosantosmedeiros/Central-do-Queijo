import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { AccountController } from './controllers/account-controller';
import {
  CreateAccountUseCase,
  DeleteAccountUseCase,
  FindAccountByEmailUseCase,
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
import { CreateCartUseCase } from '@application/usecases/cart-usecases/create-cart-usecase';
import { CreateCartProductUseCase } from '@application/usecases/cart-product-usecases/create-cart-product-usecase';
import { FindCartByAccountIdUseCase } from '@application/usecases/cart-usecases/find-cart-by-account-id-usecase';
import { ClearCartUseCase } from '@application/usecases/cart-usecases/clear-cart-usecase';
import { DeleteCartProductUseCase } from '@application/usecases/cart-product-usecases/delete-cart-product-usecase';
import { FindCartProductUseCase } from '@application/usecases/cart-product-usecases/find-cart-product-usecase';
import { UpdateCartProductUseCase } from '@application/usecases/cart-product-usecases/update-cart-product-usecase';
import { OrderController } from './controllers/order-controller';
import { CreateOrderUseCase } from '@application/usecases/order-usecases/create-order-usecase';
import { CreatePaymentUseCase } from '@application/usecases/payment-usecases/create-payment-usecase';
import { CreateOrderProductUseCase } from '@application/usecases/order-product-usecases/create-order-product-usecase';
import { CreateOrderProductUsingCartUseCase } from '@application/usecases/order-product-usecases/create-order-product-using-cart';
import { FindOrderByAccountUseCase } from '@application/usecases/order-usecases/find-order-by-account-usecase';
import { FindAccountByIdUseCase } from '@application/usecases/account-usecases/find-account-by-id-usecase';

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
