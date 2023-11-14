import { Category } from './category';

describe('Category', () => {
  it('should be able to create a new category', () => {
    const category = new Category({ name: 'any_name' });
    expect(category).toBeTruthy();
  });

  it('should create a new category with correct values', () => {
    const category = new Category({ name: 'any_name' });

    expect(category.updatedAt).toEqual(category.createdAt);
    expect(category.id).toBeTruthy();
    expect(category.name).toBe('any_name');
  });
});
