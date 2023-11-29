import { InMemoryCategoryRepository } from '@test/repositories/in-memory-categories-repository';
import { FindCategoryByNameUseCase } from './find-category-by-name-usecase';
import { makeCategory } from '@test/factories/category-factory';

describe('FindCategoryByName', () => {
  it('should find an existing category', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const findCategoryByName = new FindCategoryByNameUseCase(
      categoryRepository,
    );

    await categoryRepository.create(makeCategory());
    await categoryRepository.create(makeCategory('another_name'));

    const categories = await categoryRepository.list();
    const category = await findCategoryByName.execute(categories[1].name);

    expect(category).toBe(categories[1]);
  });

  it('should return null if no category is found', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const findCategoryByName = new FindCategoryByNameUseCase(
      categoryRepository,
    );

    const category = await findCategoryByName.execute('fake_name');

    expect(category).toBeNull();
  });
});
