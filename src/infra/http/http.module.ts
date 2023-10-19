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
import { CreateProductUseCase } from '@application/usecases/product-usecases/create-product-usecase';
import { ListProductsUseCase } from '@application/usecases/product-usecases/list-products-usecase';
import { FindProductByIdUseCase } from '@application/usecases/product-usecases/find-product-by-id-usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountController, CategoryController, ProductController],
  providers: [
    CreateAccountUseCase,
    ListAllAccountsUseCase,
    FindAccountByEmailUseCase,
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
  ],
})
export class HttpModule {}
