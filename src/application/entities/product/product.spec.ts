import { Product } from './product';

describe('Product', () => {
  it('should be able to create a new product', () => {
    const product = new Product({
      name: 'any_name',
      categoryId: 'any_id',
      image: 'any_image',
      price: 1,
    });
    expect(product).toBeTruthy();
  });

  it('should create a new product with correct values', () => {
    const product = new Product({
      name: 'any_name',
      categoryId: 'any_id',
      price: 1,
      image: 'any_image',
    });

    expect(product.updatedAt).toEqual(product.createdAt);
    expect(product.id).toBeTruthy();
    expect(product.name).toBe('any_name');
    expect(product.categoryId).toBe('any_id');
    expect(product.image).toBe('any_image');
  });

  it('should change updatedAt field if one or more fields are changed', async () => {
    const product = new Product({
      name: 'any_name',
      categoryId: 'any_id',
      price: 1,
      image: 'any_image',
    });
    const oldUpdatedAt = product.updatedAt;

    await new Promise((res) => setTimeout(res, 1000));

    product.name = 'another_name';
    product.categoryId = 'another_id';
    const newUpdatedAt = product.updatedAt;

    expect(oldUpdatedAt).not.toEqual(newUpdatedAt);
  });
});
