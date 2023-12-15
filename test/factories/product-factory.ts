import { Category } from '@application/entities/category/category';
import { Product } from '@application/entities/product/product';

export function makeProduct(
  name = 'any_name',
  price = 1,
  id = 'any_id',
  categoryId = 'any_category_id',
  image = 'any_image',
  createdAt = new Date(),
  updatedAt = new Date(),
  category = new Category({ name: 'any_category' }, 'any_category_id'),
) {
  return new Product(
    { name, categoryId, createdAt, updatedAt, price, image, category },
    id,
  );
}
