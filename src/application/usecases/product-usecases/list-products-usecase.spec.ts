import { InMemoryProductsRepository } from '@test/repositories/in-memory-products-repository';
import { ListProductsUseCase } from './list-products-usecase';
import { makeProduct } from '@test/factories/product-factory';

describe('List Products Use Case', () => {
  it('should list products correctly', async () => {
    const inMemoryProductRepository = new InMemoryProductsRepository();
    const listProductsUseCase = new ListProductsUseCase(
      inMemoryProductRepository,
    );
    const expected = 2;

    inMemoryProductRepository.categoriesIds = ['any_category_id'];

    inMemoryProductRepository.create(makeProduct());
    inMemoryProductRepository.create(makeProduct());

    const actual = (await listProductsUseCase.execute()).length;

    expect(actual).toBe(expected);
  });
});
