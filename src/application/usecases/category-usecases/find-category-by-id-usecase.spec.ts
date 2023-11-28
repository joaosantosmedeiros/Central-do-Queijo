import { InMemoryCategoryRepository } from '@test/repositories/in-memory-categories-repository';
import { FindCategoryByIdUseCase } from './find-category-by-id-usecase';
import { makeCategory } from '@test/factories/category-factory';
import { EntityNotFoundException } from '@infra/http/exceptions/entity-not-found-exception';

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

  it('should throw if no category is found', async () => {
    const inMemoryCategoryRepository = new InMemoryCategoryRepository();
    const findCategoryByIdUseCase = new FindCategoryByIdUseCase(
      inMemoryCategoryRepository,
    );

    async () => {
      expect(await findCategoryByIdUseCase.execute('fake_id')).rejects.toThrow(
        EntityNotFoundException,
      );
    };
  });
});
