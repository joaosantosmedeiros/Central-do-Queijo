import { makeProduct } from '@test/factories/product-factory';
import { InMemoryProductsRepository } from '@test/repositories/in-memory-products-repository';
import { FindProductByNameUseCase } from './find-product-by-name-usecase';

describe('Find Product By Name', () => {
  it('should find an existing product', async () => {
    const inMemoryProductRepository = new InMemoryProductsRepository();
    const findProductByNameUseCase = new FindProductByNameUseCase(
      inMemoryProductRepository,
    );

    inMemoryProductRepository.categoriesIds = ['any_id'];
    await inMemoryProductRepository.create(makeProduct());
    await inMemoryProductRepository.create(makeProduct('product_2'));

    const products = await inMemoryProductRepository.list();
    const product = await findProductByNameUseCase.execute(products[1].name);

    expect(product).toBe(products[1]);
  });

  it('should return null if no product is found', async () => {
    const inMemoryProductRepository = new InMemoryProductsRepository();
    const findProductByNameUseCase = new FindProductByNameUseCase(
      inMemoryProductRepository,
    );

    const product = await findProductByNameUseCase.execute('fake_id');

    expect(product).toBeNull();
  });
});
