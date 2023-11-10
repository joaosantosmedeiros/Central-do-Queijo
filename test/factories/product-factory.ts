import { Product } from '@application/entities/product/product';
import { randomUUID } from 'crypto';

export function makeProduct(
  name = 'any_name',
  categoryId = 'any_id',
  createdAt = new Date(),
  updatedAt = new Date(),
  id = randomUUID(),
) {
  return new Product({ name, categoryId, createdAt, updatedAt, price: 1 }, id);
}
