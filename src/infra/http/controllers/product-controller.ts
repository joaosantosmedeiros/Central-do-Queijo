import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductUseCase } from '@application/usecases/product-usecases/create-product-usecase';
import { CreateProductBody } from '../dto/create-product-body';
import { InvalidCategoryException } from '../exceptions/invalid-category-exception';

@Controller('product')
export class ProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  @Post()
  async create(@Body() body: CreateProductBody) {
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
