import { Product } from '@application/entities/product/product';
import { randomUUID } from 'crypto';

export function makeProduct(
  name = 'any_name',
  categoryId = 'any_id',
  image = 'any_image',
  createdAt = new Date(),
  updatedAt = new Date(),
  id = randomUUID(),
) {
  return new Product(
    { name, categoryId, createdAt, updatedAt, price: 1, image },
    id,
  );
}
