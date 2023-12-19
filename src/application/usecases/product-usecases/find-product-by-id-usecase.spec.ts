import { makeProduct } from '@test/factories/product-factory';
import { InMemoryProductsRepository } from '@test/repositories/in-memory-products-repository';
import { FindProductByIdUseCase } from './find-product-by-id-usecase';
import { EntityNotFoundException } from '@infra/http/exceptions/entity-not-found-exception';

describe('FindProductById', () => {
  it('should find an existing product', async () => {
    const productRepository = new InMemoryProductsRepository();
    const findProductById = new FindProductByIdUseCase(productRepository);

    await productRepository.create(makeProduct());
    await productRepository.create(makeProduct());

    const products = productRepository.products;
    const product = await findProductById.execute(products[1].id);

    expect(product).toEqual(products[1]);
  });

  it('should throw if no product is found', async () => {
    const productRepository = new InMemoryProductsRepository();
    const findProductById = new FindProductByIdUseCase(productRepository);

    async () => {
      expect(await findProductById.execute('fake_id')).rejects.toThrow(
        EntityNotFoundException,
      );
    };
  });
});
