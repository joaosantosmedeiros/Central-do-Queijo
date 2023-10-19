import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductUseCase } from '@application/usecases/product-usecases/create-product-usecase';
import { CreateProductBody } from '../dto/create-product-body';
import { InvalidCategoryException } from '../exceptions/invalid-category-exception';
import { ListProductsUseCase } from '@application/usecases/product-usecases/list-products-usecase';
import { Product } from '@application/entities/product/product';

@Controller('product')
export class ProductController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private listProductsUseCase: ListProductsUseCase,
  ) {}

  @Get()
  async list(): Promise<Product[]> {
    return this.listProductsUseCase.execute();
  }

  @Post()
  async create(
    @Body() body: CreateProductBody,
  ): Promise<{ product: Product } | undefined> {
    try {
      const { product } = await this.createProductUseCase.execute(body);

      return { product };
    } catch (err: any) {
      console.log(err);
      if (err.code === 'P2003') {
        throw new InvalidCategoryException();
      }
    }
  }
}
