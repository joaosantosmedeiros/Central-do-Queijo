import { Category } from '../category/category';
import { Product } from './product';

describe('Product', () => {
  it('should be able to create a new product', () => {
    const product = new Product({
      name: 'any_name',
      categoryId: 'any_id',
      image: 'any_image',
      price: 1,
      category: new Category({ name: 'any_category' }),
    });
    expect(product).toBeTruthy();
  });

  it('should create a new product with correct values', () => {
    const product = new Product({
      name: 'any_name',
      categoryId: 'any_id',
      price: 1,
      image: 'any_image',
      category: new Category({ name: 'any_category' }),
    });

    expect(product.updatedAt).toEqual(product.createdAt);
    expect(product.id).toBeTruthy();
    expect(product.name).toBe('any_name');
    expect(product.categoryId).toBe('any_id');
    expect(product.image).toBe('any_image');
  });
});
