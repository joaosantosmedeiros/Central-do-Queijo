import { InMemoryProductsRepository } from '@test/repositories/in-memory-products-repository';
import { CreateProductUseCase } from './create-product-usecase';
import { FindCategoryByIdUseCase } from '../category-usecases';
import { InMemoryCategoryRepository } from '@test/repositories/in-memory-categories-repository';
import { Category } from '@application/entities/category/category';

const makeSut = () => {
  const categoryRepository = new InMemoryCategoryRepository();
  const createProduct = new CreateProductUseCase(
    new InMemoryProductsRepository(),
    new FindCategoryByIdUseCase(categoryRepository),
  );

  return { categoryRepository, createProduct };
};

describe('CreateProduct Use Case', () => {
  it('should be able to create a new product', async () => {
    const { categoryRepository, createProduct } = makeSut();

    categoryRepository.categories.push(
      new Category({ name: 'any_category' }, 'any_category_id'),
    );

    const product = await createProduct.execute({
      name: 'any_name',
      categoryId: 'any_category_id',
      price: 1,
      image: 'any_image',
    });

    expect(product).toBeTruthy();
  });

  it('should not be able to create a product with an invalid category id', async () => {
    const { createProduct } = makeSut();

    expect(async () => {
      await createProduct.execute({
        name: 'any_name',
        categoryId: 'invalid_id',
        price: 1,
        image: 'any_image',
      });
    }).rejects.toThrow(Error);
  });
});
