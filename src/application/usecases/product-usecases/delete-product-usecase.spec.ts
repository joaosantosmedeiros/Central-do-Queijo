import { makeProduct } from '@test/factories/product-factory';
import { InMemoryProductsRepository } from '@test/repositories/in-memory-products-repository';
import { DeleteProductUseCase } from './delete-product-usecase';

describe('Delete Product UseCase', () => {
  it('should delete an product correctly', async () => {
    const inMemoryProductsRepository = new InMemoryProductsRepository();
    const deleteProductUseCase = new DeleteProductUseCase(
      inMemoryProductsRepository,
    );

    inMemoryProductsRepository.categoriesIds = ['any_id'];
    inMemoryProductsRepository.create(makeProduct());
    const product = inMemoryProductsRepository.products[0];

    await deleteProductUseCase.execute(product.id);
    expect(inMemoryProductsRepository.products.length).toBe(0);
  });

  it('should not delete an unexistent product', async () => {
    const inMemoryProductsRepository = new InMemoryProductsRepository();
    const deleteProductUseCase = new DeleteProductUseCase(
      inMemoryProductsRepository,
    );

    expect(
      async () => await deleteProductUseCase.execute('fake_id'),
    ).rejects.toThrow(Error);
  });
});
