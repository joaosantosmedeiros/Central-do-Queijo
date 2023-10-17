import { InMemoryProductsRepository } from '@test/repositories/in-memory-products-repository';
import { CreateProductUseCase } from './create-product-usecase';

describe('CreateProduct Use Case', () => {
  it('should be able to create a new product', async () => {
    const productRepository = new InMemoryProductsRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    productRepository.categoriesIds.push('any_id');

    const { product } = await createProductUseCase.execute({
      name: 'any_name',
      categoryId: 'any_id',
    });

    expect(product).toBeTruthy();
  });

  it('should not be able to create a product with an invalid category id', async () => {
    const productRepository = new InMemoryProductsRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    expect(async () => {
      await createProductUseCase.execute({
        name: 'any_name',
        categoryId: 'invalid_id',
      });
    }).rejects.toThrow(Error);
  });
});
