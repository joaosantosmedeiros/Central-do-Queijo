import { InMemoryCategoryRepository } from '@test/repositories/in-memory-categories-repository';
import { FindCategoryByNameUseCase } from './find-category-by-name-usecase';
import { makeCategory } from '@test/factories/category-factory';

describe('FindCategoryByName', () => {
  it('should find an existing category', async () => {
    const inMemoryCategoryRepository = new InMemoryCategoryRepository();
    const findCategoryByNameUseCase = new FindCategoryByNameUseCase(
      inMemoryCategoryRepository,
    );

    await inMemoryCategoryRepository.create(makeCategory());
    await inMemoryCategoryRepository.create(makeCategory('another_name'));

    const categories = await inMemoryCategoryRepository.list();
    const category = await findCategoryByNameUseCase.execute(
      categories[1].name,
    );

    expect(category).toBe(categories[1]);
  });

  it('should return null if no category is found', async () => {
    const inMemoryCategoryRepository = new InMemoryCategoryRepository();
    const findCategoryByNameUseCase = new FindCategoryByNameUseCase(
      inMemoryCategoryRepository,
    );

    const category = await findCategoryByNameUseCase.execute('fake_name');

    expect(category).toBeNull();
  });
});
