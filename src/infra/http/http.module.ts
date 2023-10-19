import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account-controller';
import { CreateAccountUseCase } from '@application/usecases/account-usecases/create-account-usecase';
import { DatabaseModule } from '@infra/database/database.module';
import { ListAllAccountsUseCase } from '@application/usecases/account-usecases/list-accounts-usecase';
import { FindAccountByEmailUseCase } from '@application/usecases/account-usecases/find-account-by-email-usecase';
import { DeleteAccountUseCase } from '@application/usecases/account-usecases/delete-account-usecase';
import { UpdateAccountUseCase } from '@application/usecases/account-usecases/update-account-usecase';
import { CategoryController } from './controllers/category-controller';
import { CreateCategoryUseCase } from '@application/usecases/category-usecases/create-category-usecase';
import { ListCategoriesUseCase } from '@application/usecases/category-usecases/list-categories-usecase';
import { FindCategoryByIdUseCase } from '@application/usecases/category-usecases/find-category-by-id-usecase';
import { UpdateCategoryUseCase } from '@application/usecases/category-usecases/update-category-usecase';
import { DeleteCategoryUseCase } from '@application/usecases/category-usecases/delete-category-usecase';
import { FindCategoryByNameUseCase } from '@application/usecases/category-usecases/find-category-by-name-usecase';
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
