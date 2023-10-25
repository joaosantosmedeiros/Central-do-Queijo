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
import { CategoryAlreadyExistsException } from '../exceptions/category-already-exists-exception';
import { EntityNotFoundException } from '../exceptions/entity-not-found-exception';
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  FindCategoryByIdUseCase,
  FindCategoryByNameUseCase,
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
    private findCategoryByNameUseCase: FindCategoryByNameUseCase,
    private deleteCategoryByIdUseCase: DeleteCategoryUseCase,
    private updateCategoryUseCase: UpdateCategoryUseCase,
  ) {}

  @Get()
  async listAll(): Promise<Category[]> {
    const categories = await this.listAllCategoriesUseCase.execute();

    return categories;
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Category | null> {
    const category = await this.findCategoryByIdUseCase.execute(id);

    if (!category) {
      throw new EntityNotFoundException('Category');
    }

    return category;
  }

  @Roles(UserType.Admin)
  @Post()
  async create(@Body() body: CreateCategoryBody) {
    try {
      const { category } = await this.createCategoryUseCase.execute(body);

      return { category };
    } catch (err: any) {
      if (err.code === 'P2002') {
        throw new CategoryAlreadyExistsException();
      }
    }
  }

  @Roles(UserType.Admin)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: CreateCategoryBody,
  ): Promise<Category> {
    const category = await this.findCategoryByIdUseCase.execute(id);
    if (!category) {
      throw new EntityNotFoundException('Category');
    }

    const categoryExists = await this.findCategoryByNameUseCase.execute(
      body.name,
    );

    if (categoryExists) {
      throw new CategoryAlreadyExistsException();
    }

    return this.updateCategoryUseCase.execute({
      id,
      name: body.name,
    });
  }

  @Roles(UserType.Admin)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    const category = await this.findCategoryByIdUseCase.execute(id);
    if (!category) {
      throw new EntityNotFoundException('Category');
    }

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
