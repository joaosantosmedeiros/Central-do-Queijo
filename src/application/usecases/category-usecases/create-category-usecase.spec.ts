import { InMemoryCategoryRepository } from '@test/repositories/in-memory-categories-repository';
import { CreateCategoryUseCase } from './create-category-usecase';
import { FindCategoryByNameUseCase } from './find-category-by-name-usecase';
import { CategoryAlreadyExistsException } from '@infra/http/exceptions/category-already-exists-exception';

const makeSut = () => {
  const categoryRepository = new InMemoryCategoryRepository();
  const createCategory = new CreateCategoryUseCase(
    categoryRepository,
    new FindCategoryByNameUseCase(categoryRepository),
  );
  return { categoryRepository, createCategory };
};

describe('Create Category Use Case', () => {
  it('should be able to create a new category', async () => {
    const { createCategory } = makeSut();

    const category = await createCategory.execute({
      name: 'any_name',
    });

    expect(category).toBeTruthy();
  });

  it('should not be able to create an category with an used name', async () => {
    const { createCategory } = makeSut();

    await createCategory.execute({
      name: 'any_name',
    });

    expect(async () => {
      await createCategory.execute({
        name: 'any_name',
      });
    }).rejects.toThrow(CategoryAlreadyExistsException);
  });
});
