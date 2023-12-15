import { Category } from '@application/entities/category/category';

export class ReturnCategoryDto {
  id: string;
  name: string;
  count: number | undefined;
  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.count = category.count ? category.count.Product : undefined;
  }
}
