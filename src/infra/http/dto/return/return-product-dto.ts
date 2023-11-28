import { Product } from '@application/entities/product/product';

export class ReturnProductDto {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  image: string;
  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.categoryId = product.categoryId;
    this.price = product.price;
    this.image = product.image;
  }
}
