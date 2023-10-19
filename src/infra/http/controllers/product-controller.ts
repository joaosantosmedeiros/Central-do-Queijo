import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductUseCase } from '@application/usecases/product-usecases/create-product-usecase';
import { CreateProductBody } from '../dto/create-product-body';
import { InvalidCategoryException } from '../exceptions/invalid-category-exception';
import { ListProductsUseCase } from '@application/usecases/product-usecases/list-products-usecase';
import { Product } from '@application/entities/product/product';
import { FindProductByIdUseCase } from '@application/usecases/product-usecases/find-product-by-id-usecase';
import { EntityNotFoundException } from '../exceptions/entity-not-found-exception';

@Controller('product')
export class ProductController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private listProductsUseCase: ListProductsUseCase,
    private findProductByIdUseCase: FindProductByIdUseCase,
  ) {}

  @Get()
  async list(): Promise<Product[]> {
    return this.listProductsUseCase.execute();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Product | null> {
    const product = await this.findProductByIdUseCase.execute(id);

    if (!product) {
      throw new EntityNotFoundException('Product');
    }

    return product;
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
