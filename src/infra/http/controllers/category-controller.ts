import { Category } from '@application/entities/category/category';
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
import { CreateCategoryBody } from '../dto/body/create-category-body';
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  FindCategoryByIdUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from '@application/usecases/category-usecases';
import { CategoryInUseException } from '../exceptions/category-in-use-exception';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from 'src/enums/user-type.enum';

@Controller('category')
export class CategoryController {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private listAllCategoriesUseCase: ListCategoriesUseCase,
    private findCategoryByIdUseCase: FindCategoryByIdUseCase,
    private deleteCategoryByIdUseCase: DeleteCategoryUseCase,
    private updateCategoryUseCase: UpdateCategoryUseCase,
  ) {}

  @Get()
  async listAll(): Promise<Category[]> {
    return this.listAllCategoriesUseCase.execute();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Category> {
    return this.findCategoryByIdUseCase.execute(id);
  }

  @Roles(UserType.Admin)
  @Post()
  async create(@Body() body: CreateCategoryBody): Promise<Category> {
    return this.createCategoryUseCase.execute(body);
  }

  @Roles(UserType.Admin)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: CreateCategoryBody,
  ): Promise<Category> {
    await this.findCategoryByIdUseCase.execute(id);

    return this.updateCategoryUseCase.execute({
      id,
      name: body.name,
    });
  }

  @Roles(UserType.Admin)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.findCategoryByIdUseCase.execute(id);

    try {
      await this.deleteCategoryByIdUseCase.execute(id);
    } catch (err: any) {
      if (err.code === 'P2003') {
        throw new CategoryInUseException();
      }
      console.log(err);
    }
  }
}
