import { Category } from '@application/entities/category/category';

export class ReturnCategoryDto {
  id: string;
  name: string;
  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
  }
}
