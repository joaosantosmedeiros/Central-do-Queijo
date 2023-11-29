import { InMemoryCategoryRepository } from '@test/repositories/in-memory-categories-repository';
import { UpdateCategoryUseCase } from './update-category-usecase';
import { makeCategory } from '@test/factories/category-factory';
import { FindCategoryByNameUseCase } from './find-category-by-name-usecase';
import { CategoryAlreadyExistsException } from '@infra/http/exceptions/category-already-exists-exception';

const makeSut = () => {
  const categoryRepository = new InMemoryCategoryRepository();
  const updateCategory = new UpdateCategoryUseCase(
    categoryRepository,
    new FindCategoryByNameUseCase(categoryRepository),
  );
  return { categoryRepository, updateCategory };
};

describe('UpdateCategoryUseCase', () => {
  it('should update a category properly', async () => {
    const { categoryRepository, updateCategory } = makeSut();
    const expected = 'updated_name';

    await categoryRepository.create(makeCategory());
    const category = categoryRepository.categories[0];

    const updatedCategory = await updateCategory.execute({
      id: category.id,
      name: 'updated_name',
    });
    const actual = updatedCategory.name;

    expect(actual).toBe(expected);
    expect(updatedCategory.updatedAt == updatedCategory.createdAt).toBeFalsy();
  });

  it('should not update an unexistent category', async () => {
    const { updateCategory } = makeSut();

    expect(
      async () =>
        await updateCategory.execute({
          id: 'fake_id',
          name: 'any_name',
        }),
    ).rejects.toThrow();
  });

  it('should not update a category with invalid name', async () => {
    const { categoryRepository, updateCategory } = makeSut();

    await categoryRepository.create(makeCategory());
    await categoryRepository.create(makeCategory('another_category'));

    const category = categoryRepository.categories[0];

    expect(
      async () =>
        await updateCategory.execute({
          id: category.id,
          name: 'another_category',
        }),
    ).rejects.toThrow(CategoryAlreadyExistsException);
  });
});
