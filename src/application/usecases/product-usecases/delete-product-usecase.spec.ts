import { makeProduct } from '@test/factories/product-factory';
import { InMemoryProductsRepository } from '@test/repositories/in-memory-products-repository';
import { DeleteProductUseCase } from './delete-product-usecase';

describe('Delete Product UseCase', () => {
  it('should delete an product correctly', async () => {
    const productRepository = new InMemoryProductsRepository();
    const deleteProduct = new DeleteProductUseCase(productRepository);

    productRepository.create(makeProduct());
    const product = productRepository.products[0];

    await deleteProduct.execute(product.id);
    expect(productRepository.products.length).toBe(0);
  });

  it('should not delete an unexistent product', async () => {
    const productRepository = new InMemoryProductsRepository();
    const deleteProduct = new DeleteProductUseCase(productRepository);

    expect(async () => await deleteProduct.execute('fake_id')).rejects.toThrow(
      Error,
    );
  });
});
