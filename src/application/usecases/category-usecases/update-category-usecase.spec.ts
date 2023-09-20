import { InMemoryCategoryRepository } from '@test/repositories/in-memory-categories-repository';
import { UpdateCategoryUseCase } from './update-category-usecase';
import { makeCategory } from '@test/factories/category-factory';
import { CategoryAlreadyExistsError } from '../errors/category-already-exists-error';

describe('UpdateCategoryUseCase', () => {
  it('should update a category properly', async () => {
    const inMemoryCategoryRepository = new InMemoryCategoryRepository();
    const updateCategoryUseCase = new UpdateCategoryUseCase(
      inMemoryCategoryRepository,
    );
    const expected = 'updated_name';

    await inMemoryCategoryRepository.create(makeCategory());
    const category = inMemoryCategoryRepository.categories[0];

    const updatedAccount = await updateCategoryUseCase.execute({
      id: category.id,
      name: 'updated_name',
    });
    const actual = updatedAccount.name;

    expect(actual).toBe(expected);
    expect(updatedAccount.updatedAt == updatedAccount.createdAt).toBeFalsy();
  });

  it('should not update an unexistent category', async () => {
    const inMemoryCategoryRepository = new InMemoryCategoryRepository();
    const updateCategoryUseCase = new UpdateCategoryUseCase(
      inMemoryCategoryRepository,
    );

    expect(
      async () =>
        await updateCategoryUseCase.execute({
          id: 'fake_id',
          name: 'any_name',
        }),
    ).rejects.toThrow();
  });

  it('should not update a category with invalid name', async () => {
    const inMemoryCategoryRepository = new InMemoryCategoryRepository();
    const updateCategoryUseCase = new UpdateCategoryUseCase(
      inMemoryCategoryRepository,
    );

    await inMemoryCategoryRepository.create(makeCategory());
    await inMemoryCategoryRepository.create(makeCategory('another_category'));

    const category = inMemoryCategoryRepository.categories[0];

    expect(
      async () =>
        await updateCategoryUseCase.execute({
          id: category.id,
          name: 'another_category',
        }),
    ).rejects.toThrow(CategoryAlreadyExistsError);
  });
});
