import { Category } from '@application/entities/category/category';
import { CreateCategoryUseCase } from '@application/usecases/category-usecases/create-category-usecase';
import { DeleteCategoryUseCase } from '@application/usecases/category-usecases/delete-category-usecase';
import { FindCategoryByIdUseCase } from '@application/usecases/category-usecases/find-category-by-id-usecase';
import { ListCategoriesUseCase } from '@application/usecases/category-usecases/list-categories-usecase';
import { UpdateCategoryUseCase } from '@application/usecases/category-usecases/update-category-usecase';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryNotFoundException } from '../exceptions/category-not-found-exception';
import { SaveCategoryBody } from '../dto/save-category-body';
import { CategoryAlreadyExistsException } from '../exceptions/category-already-exists-exception';
import { FindCategoryByNameUseCase } from '@application/usecases/category-usecases/find-category-by-name-usecase';

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
      throw new CategoryNotFoundException();
    }

    return category;
  }

  @Post()
  async create(@Body() body: SaveCategoryBody) {
    try {
      const { category } = await this.createCategoryUseCase.execute(body);

      return { category };
    } catch (err: any) {
      if (err.code === 'P2002') {
        throw new CategoryAlreadyExistsException();
      }
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: SaveCategoryBody,
  ): Promise<Category> {
    const category = await this.findCategoryByIdUseCase.execute(id);
    if (!category) {
      throw new CategoryNotFoundException();
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

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const category = await this.findCategoryByIdUseCase.execute(id);
    if (!category) {
      throw new CategoryNotFoundException();
    }

    await this.deleteCategoryByIdUseCase.execute(id);
  }
}
