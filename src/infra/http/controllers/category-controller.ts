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
import { ReturnCategoryDto } from '../dto/return/return-category-dto';

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
  async list(): Promise<ReturnCategoryDto[]> {
    const categories = await this.listAllCategoriesUseCase.execute();
    return categories.map((category) => new ReturnCategoryDto(category));
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ReturnCategoryDto> {
    return new ReturnCategoryDto(
      await this.findCategoryByIdUseCase.execute(id),
    );
  }

  @Roles(UserType.Admin)
  @Post()
  async create(@Body() body: CreateCategoryBody): Promise<ReturnCategoryDto> {
    return new ReturnCategoryDto(
      await this.createCategoryUseCase.execute(body),
    );
  }

  @Roles(UserType.Admin)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: CreateCategoryBody,
  ): Promise<ReturnCategoryDto> {
    await this.findCategoryByIdUseCase.execute(id);

    return new ReturnCategoryDto(
      await this.updateCategoryUseCase.execute({
        id,
        name: body.name,
      }),
    );
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
