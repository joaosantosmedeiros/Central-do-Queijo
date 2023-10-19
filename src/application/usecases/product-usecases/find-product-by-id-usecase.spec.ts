import { makeProduct } from '@test/factories/product-factory';
import { InMemoryProductsRepository } from '@test/repositories/in-memory-products-repository';
import { FindProductByIdUseCase } from './find-product-by-id-usecase';

describe('Find Product By Id', () => {
  it('should find an existing product', async () => {
    const inMemoryProductRepository = new InMemoryProductsRepository();
    const findProductByIdUseCase = new FindProductByIdUseCase(
      inMemoryProductRepository,
    );

    inMemoryProductRepository.categoriesIds = ['any_id'];
    await inMemoryProductRepository.create(makeProduct());
    await inMemoryProductRepository.create(makeProduct());

    const products = await inMemoryProductRepository.list();
    const product = await findProductByIdUseCase.execute(products[1].id);

    expect(product).toBe(products[1]);
  });

  it('should return null if no product is found', async () => {
    const inMemoryProductRepository = new InMemoryProductsRepository();
    const findProductByIdUseCase = new FindProductByIdUseCase(
      inMemoryProductRepository,
    );

    const product = await findProductByIdUseCase.execute('fake_id');

    expect(product).toBeNull();
  });
});
