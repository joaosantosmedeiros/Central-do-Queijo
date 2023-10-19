import { InMemoryCategoryRepository } from '@test/repositories/in-memory-categories-repository';
import { CreateCategoryUseCase } from './create-category-usecase';
import { EntityAlreadyExistsError } from '../errors/entity-already-exists-error';

describe('Create Category Use Case', () => {
  it('should be able to create a new category', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);

    const { category } = await createCategoryUseCase.execute({
      name: 'any_name',
    });

    expect(category).toBeTruthy();
  });

  it('should not be able to create an category with an used name', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);

    await createCategoryUseCase.execute({
      name: 'any_name',
    });

    expect(async () => {
      await createCategoryUseCase.execute({
        name: 'any_name',
      });
    }).rejects.toThrow(EntityAlreadyExistsError);
  });
});
