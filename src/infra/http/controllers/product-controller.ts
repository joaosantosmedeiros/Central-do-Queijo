import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateProductUseCase,
  DeleteProductUseCase,
  FindProductByIdUseCase,
  ListProductsUseCase,
  UpdateProductUseCase,
} from '@application/usecases/product-usecases';
import { CreateProductBody } from '../dto/body/create-product-body';
import { InvalidCategoryException } from '../exceptions/invalid-category-exception';
import { Product } from '@application/entities/product/product';
import { EntityNotFoundException } from '../exceptions/entity-not-found-exception';
import { UpdateProductBody } from '../dto/body/update-product-body';

@Controller('product')
export class ProductController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private listProductsUseCase: ListProductsUseCase,
    private findProductByIdUseCase: FindProductByIdUseCase,
    private deleteProductIdUseCase: DeleteProductUseCase,
    private updateProductUseCase: UpdateProductUseCase,
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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateProductBody,
  ): Promise<Product | undefined> {
    const product = await this.findProductByIdUseCase.execute(id);
    if (!product) {
      throw new EntityNotFoundException('Product');
    }

    try {
      const product = await this.updateProductUseCase.execute({
        id,
        name: body.name,
        categoryId: body.categoryId,
      });

      return product;
    } catch (err: any) {
      console.log(err);
      if (err.code === 'P2003') {
        throw new InvalidCategoryException();
      }
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    const category = await this.findProductByIdUseCase.execute(id);
    if (!category) {
      throw new EntityNotFoundException('Product');
    }

    await this.deleteProductIdUseCase.execute(id);
  }
}
