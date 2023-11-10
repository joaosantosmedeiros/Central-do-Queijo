import { Product } from '@application/entities/product/product';

export class ReturnProductDto {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  constructor(private product: Product) {
    this.id = product.id;
    this.name = product.name;

  }
}
