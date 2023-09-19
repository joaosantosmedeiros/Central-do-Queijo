import { ListCategoriesUseCase } from './list-categories-usecase';
import { makeCategory } from '@test/factories/category-factory';
import { InMemoryCategoryRepository } from '@test/repositories/in-memory-categories-repository';

describe('List Categories Use Case', () => {
  it('should list categories correctly', async () => {
    const inMemoryCategoryRepository = new InMemoryCategoryRepository();
    const listCategoriesUseCase = new ListCategoriesUseCase(
      inMemoryCategoryRepository,
    );
    const expected = 2;

    inMemoryCategoryRepository.create(makeCategory());
    inMemoryCategoryRepository.create(makeCategory('another_name'));

    const actual = (await listCategoriesUseCase.execute()).length;

    expect(actual).toBe(expected);
  });

  it('should not list duplicates', async () => {
    const inMemoryCategoryRepository = new InMemoryCategoryRepository();
    const listCategoriesUseCase = new ListCategoriesUseCase(
      inMemoryCategoryRepository,
    );
    const expected = 1;

    inMemoryCategoryRepository.create(makeCategory());
    inMemoryCategoryRepository.create(makeCategory()).catch(() => undefined);

    const actual = (await listCategoriesUseCase.execute()).length;

    expect(actual).toBe(expected);
  });
});
