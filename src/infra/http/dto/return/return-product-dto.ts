import { Product } from '@application/entities/product/product';
import { ReturnCategoryDto } from './return-category-dto';

export class ReturnProductDto {
  id: string;
  name: string;
  categoryId: string;
  category?: ReturnCategoryDto;
  price: number;
  image: string;
  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.categoryId = product.categoryId;
    this.category = product.category
      ? new ReturnCategoryDto(product.category)
      : undefined;
    this.price = product.price;
    this.image = product.image;
  }
}
