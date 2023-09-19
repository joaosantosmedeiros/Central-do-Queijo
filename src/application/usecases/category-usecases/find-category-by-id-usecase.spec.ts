import { InMemoryCategoryRepository } from '@test/repositories/in-memory-categories-repository';
import { FindCategoryByIdUseCase } from './find-category-by-id-usecase';
import { makeCategory } from '@test/factories/category-factory';

describe('Find Category By Id', () => {
  it('should find an existing category', async () => {
    const inMemoryCategoryRepository = new InMemoryCategoryRepository();
    const findCategoryByIdUseCase = new FindCategoryByIdUseCase(
      inMemoryCategoryRepository,
    );

    await inMemoryCategoryRepository.create(makeCategory());
    await inMemoryCategoryRepository.create(makeCategory('another_name'));

    const categories = await inMemoryCategoryRepository.list();
    const category = await findCategoryByIdUseCase.execute(categories[1].id);

    expect(category).toBe(categories[1]);
  });

  it('should return null if no category is found', async () => {
    const inMemoryCategoryRepository = new InMemoryCategoryRepository();
    const findCategoryByIdUseCase = new FindCategoryByIdUseCase(
      inMemoryCategoryRepository,
    );

    const category = await findCategoryByIdUseCase.execute('fake_id');

    expect(category).toBeNull();
  });
});
