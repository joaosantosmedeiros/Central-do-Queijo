import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateProductUseCase,
  DeleteProductUseCase,
  FindProductByIdUseCase,
  FindProductByNameContainingUseCase,
  ListProductsUseCase,
  UpdateProductUseCase,
} from '@application/usecases/product-usecases';
import { CreateProductBody } from '../dto/body/create-product-body';
import { UpdateProductBody } from '../dto/body/update-product-body';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from 'src/enums/user-type.enum';
import { ReturnProductDto } from '../dto/return/return-product-dto';
import { PaginationDto } from '../dto/pagination-dto';

@Controller('product')
export class ProductController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private listProductsUseCase: ListProductsUseCase,
    private findProductByIdUseCase: FindProductByIdUseCase,
    private findProductByNameContainig: FindProductByNameContainingUseCase,
    private deleteProductIdUseCase: DeleteProductUseCase,
    private updateProductUseCase: UpdateProductUseCase,
  ) {}

  @Get()
  async list(): Promise<ReturnProductDto[]> {
    const products = await this.listProductsUseCase.execute([], true);
    return products.map((product) => {
      const dto = new ReturnProductDto(product);
      dto.category = undefined;
      return dto;
    });
  }

  @Get('page')
  async findPaged(
    @Query('search') search: string,
    @Query('size') size: number,
    @Query('page') page: number,
  ): Promise<PaginationDto<ReturnProductDto[]>> {
    return this.findProductByNameContainig.execute(search, size, page);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ReturnProductDto> {
    const product = await this.findProductByIdUseCase.execute(id);
    const dto = new ReturnProductDto(product);
    dto.category = undefined;
    return dto;
  }

  @Roles(UserType.Admin)
  @Post()
  async create(@Body() body: CreateProductBody): Promise<ReturnProductDto> {
    const product = await this.createProductUseCase.execute(body);
    const dto = new ReturnProductDto(product);
    dto.category = undefined;
    return dto;
  }

  @Roles(UserType.Admin)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateProductBody,
  ): Promise<ReturnProductDto> {
    await this.findProductByIdUseCase.execute(id);

    const product = await this.updateProductUseCase.execute({
      id,
      name: body.name,
      categoryId: body.categoryId,
      image: body.image,
      price: body.price,
    });

    const dto = new ReturnProductDto(product);
    dto.category = undefined;
    return dto;
  }

  @Roles(UserType.Admin)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    const product = await this.findProductByIdUseCase.execute(id);

    await this.deleteProductIdUseCase.execute(product.id);
  }
}
