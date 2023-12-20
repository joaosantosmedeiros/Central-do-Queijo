import { makeProduct } from '@test/factories/product-factory';
import { InMemoryProductsRepository } from '@test/repositories/in-memory-products-repository';
import { FindProductByIdUseCase } from './find-product-by-id-usecase';
import { EntityNotFoundException } from '@infra/http/exceptions/entity-not-found-exception';

describe('FindProductById', () => {
  it('should find an existing product', async () => {
    const productRepository = new InMemoryProductsRepository();
    const findProductById = new FindProductByIdUseCase(productRepository);

    await productRepository.create(makeProduct());
    await productRepository.create(makeProduct('any_name', 3.0, 'any_id'));

    const product = await findProductById.execute('any_id');

    expect(product).toBeTruthy();
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
