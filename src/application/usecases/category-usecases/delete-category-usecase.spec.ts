import { makeCategory } from '@test/factories/category-factory';
import { DeleteCategoryUseCase } from './delete-category-usecase';
import { InMemoryCategoryRepository } from '@test/repositories/in-memory-categories-repository';

describe('DeleteCategoryUseCase', () => {
  it('should delete an category correctly', async () => {
    const inMemoryCategoryRepository = new InMemoryCategoryRepository();
    const deleteCategoryUseCase = new DeleteCategoryUseCase(
      inMemoryCategoryRepository,
    );

    inMemoryCategoryRepository.create(makeCategory());
    const category = inMemoryCategoryRepository.categories[0];

    await deleteCategoryUseCase.execute(category.id);
    expect(inMemoryCategoryRepository.categories.length).toBe(0);
  });

  it('should not delete an unexistent category', async () => {
    const inMemoryCategoryRepository = new InMemoryCategoryRepository();
    const deleteCategoryUseCase = new DeleteCategoryUseCase(
      inMemoryCategoryRepository,
    );

    expect(
      async () => await deleteCategoryUseCase.execute('fake_id'),
    ).rejects.toThrow(Error);
  });
});
