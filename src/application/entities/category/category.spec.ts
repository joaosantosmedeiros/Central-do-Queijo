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

  it('should change updatedAt field if one or more fields are changed', async () => {
    const category = new Category({
      name: 'any_name',
    });
    const oldUpdatedAt = category.updatedAt;

    await new Promise((res) => setTimeout(res, 1000));

    category.name = 'another_name';
    const newUpdatedAt = category.updatedAt;

    expect(oldUpdatedAt).not.toEqual(newUpdatedAt);
  });
});
