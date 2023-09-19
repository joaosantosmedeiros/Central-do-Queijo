import { Category } from '@application/entities/category/category';
import { randomUUID } from 'crypto';

export function makeCategory(
  name = 'any_name',
  createdAt = new Date(),
  updatedAt = new Date(),
  id = randomUUID(),
) {
  return new Category({ name, createdAt, updatedAt }, id);
}
