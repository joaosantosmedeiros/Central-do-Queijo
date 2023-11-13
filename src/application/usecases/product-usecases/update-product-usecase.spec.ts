import { InMemoryProductsRepository } from '@test/repositories/in-memory-products-repository';
import { UpdateProductUseCase } from './update-product-usecase';
import { makeProduct } from '@test/factories/product-factory';

describe('Update Product UseCase', () => {
  it('should update a product properly', async () => {
    const inMemoryProductRepository = new InMemoryProductsRepository();
    const updateProductUseCase = new UpdateProductUseCase(
      inMemoryProductRepository,
    );
    const expected = 'updated_name';

    inMemoryProductRepository.categoriesIds = ['any_id', 'updated_id'];
    await inMemoryProductRepository.create(makeProduct());
    const product = inMemoryProductRepository.products[0];

    const updatedProduct = await updateProductUseCase.execute({
      id: product.id,
      name: 'updated_name',
      categoryId: 'updated_id',
      price: 33,
      image: 'updated_image',
    });
    const actual = updatedProduct.name;

    expect(actual).toBe(expected);
    expect(updatedProduct.updatedAt == updatedProduct.createdAt).toBeFalsy();
  });

  it('should not update an unexistent product', async () => {
    const inMemoryProductRepository = new InMemoryProductsRepository();
    const updateProductUseCase = new UpdateProductUseCase(
      inMemoryProductRepository,
    );

    expect(
      async () =>
        await updateProductUseCase.execute({
          id: 'fake_id',
          name: 'any_name',
          categoryId: 'updated_id',
          price: 33,
          image: 'updated_image',
        }),
    ).rejects.toThrow();
  });

  it('should not update a product with invalid category', async () => {
    const inMemoryProductRepository = new InMemoryProductsRepository();
    const updateProductUseCase = new UpdateProductUseCase(
      inMemoryProductRepository,
    );

    inMemoryProductRepository.categoriesIds = ['any_id'];
    await inMemoryProductRepository.create(makeProduct());

    const product = inMemoryProductRepository.products[0];

    expect(
      async () =>
        await updateProductUseCase.execute({
          id: product.id,
          name: 'any_name',
          categoryId: 'updated_id',
          price: 33,
          image: 'updated_image',
        }),
    ).rejects.toThrow();
  });
});
