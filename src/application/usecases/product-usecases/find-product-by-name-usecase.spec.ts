import { makeProduct } from '@test/factories/product-factory';
import { InMemoryProductsRepository } from '@test/repositories/in-memory-products-repository';
import { FindProductByNameUseCase } from './find-product-by-name-usecase';
import { EntityNotFoundException } from '@infra/http/exceptions/entity-not-found-exception';

describe('Find Product By Name', () => {
  it('should find an existing product', async () => {
    const productRepository = new InMemoryProductsRepository();
    const findProductByName = new FindProductByNameUseCase(productRepository);

    await productRepository.create(makeProduct());
    await productRepository.create(makeProduct('product_2'));

    const products = await productRepository.list();
    const product = await findProductByName.execute(products[1].name);

    expect(product).toBe(products[1]);
  });

  it('should throw if no product is found', async () => {
    const productRepository = new InMemoryProductsRepository();
    const findProductByName = new FindProductByNameUseCase(productRepository);

    async () => {
      expect(await findProductByName.execute('fake_id')).rejects.toThrow(
        EntityNotFoundException,
      );
    };
  });
});
