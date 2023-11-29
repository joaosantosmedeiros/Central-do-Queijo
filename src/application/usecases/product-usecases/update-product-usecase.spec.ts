import { InMemoryProductsRepository } from '@test/repositories/in-memory-products-repository';
import { UpdateProductUseCase } from './update-product-usecase';
import { makeProduct } from '@test/factories/product-factory';
import { FindCategoryByIdUseCase } from '../category-usecases';
import { InMemoryCategoryRepository } from '@test/repositories/in-memory-categories-repository';
import { Category } from '@application/entities/category/category';

const makeSut = () => {
  const categoryRepository = new InMemoryCategoryRepository();
  const productRepository = new InMemoryProductsRepository();
  const updateProduct = new UpdateProductUseCase(
    productRepository,
    new FindCategoryByIdUseCase(categoryRepository),
  );

  return { categoryRepository, updateProduct, productRepository };
};

describe('Update Product UseCase', () => {
  it('should update a product properly', async () => {
    const { categoryRepository, productRepository, updateProduct } = makeSut();

    categoryRepository.categories.push(
      new Category({ name: 'any_name' }, 'any_category_id'),
      new Category({ name: 'another_name' }, 'updated_id'),
    );

    await productRepository.create(
      makeProduct('any_product', 4, '1', 'any_category_id'),
    );
    const product = productRepository.products[0];

    const updatedProduct = await updateProduct.execute({
      id: product.id,
      name: 'updated_name',
      categoryId: 'updated_id',
      price: 33,
      image: 'updated_image',
    });

    expect(updatedProduct.name).toBe('updated_name');
    expect(updatedProduct.updatedAt == updatedProduct.createdAt).toBeFalsy();
  });

  it('should not update an unexistent product', async () => {
    const { updateProduct } = makeSut();

    expect(
      async () =>
        await updateProduct.execute({
          id: 'fake_id',
          name: 'any_name',
          categoryId: 'updated_id',
          price: 33,
          image: 'updated_image',
        }),
    ).rejects.toThrow();
  });

  it('should not update a product with invalid category', async () => {
    const { categoryRepository, productRepository, updateProduct } = makeSut();

    categoryRepository.categories.push(
      new Category({ name: 'any_name' }, 'any_category_id'),
    );

    await productRepository.create(makeProduct());

    const product = productRepository.products[0];

    expect(
      async () =>
        await updateProduct.execute({
          id: product.id,
          name: 'any_name',
          categoryId: 'updated_id',
          price: 33,
          image: 'updated_image',
        }),
    ).rejects.toThrow();
  });
});
