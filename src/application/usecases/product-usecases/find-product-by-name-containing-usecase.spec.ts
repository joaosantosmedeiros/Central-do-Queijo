import { InMemoryProductsRepository } from '@test/repositories/in-memory-products-repository';
import { FindProductByNameContainingUseCase } from './find-product-by-name-containing-usecase';
import { makeProduct } from '@test/factories/product-factory';
import { ReturnProductDto } from '@infra/http/dto/return/return-product-dto';

describe('FindProductByNameContainingUseCase', () => {
  it('should search correctly with only one page', async () => {
    const productRepository = new InMemoryProductsRepository();
    const findProductByNameContaining = new FindProductByNameContainingUseCase(
      productRepository,
    );

    for (let i = 1; i <= 7; i++) {
      productRepository.create(makeProduct(`product${i}`));
    }
    productRepository.create(makeProduct('shampoo'));

    const products = await findProductByNameContaining.execute('produ');
    expect(products.data.length).toBe(7);
    expect(products.meta.currentPage).toBe(1);
    expect(products.meta.itemsPerPage).toBe(10);
    expect(products.meta.totalItems).toBe(7);
    expect(products.meta.totalPages).toBe(1);
  });

  it('should search correctly with 2 or more pages', async () => {
    const productRepository = new InMemoryProductsRepository();
    const findProductByNameContaining = new FindProductByNameContainingUseCase(
      productRepository,
    );

    for (let i = 1; i <= 9; i++) {
      productRepository.create(makeProduct(`product${i}`));
    }
    productRepository.create(makeProduct('shampoo'));

    const products = await findProductByNameContaining.execute('produ', 2);
    expect(products.data.length).toBe(2);
    expect(products.meta.currentPage).toBe(1);
    expect(products.meta.itemsPerPage).toBe(2);
    expect(products.meta.totalItems).toBe(9);
    expect(products.meta.totalPages).toBe(5);
    expect(products.data).toEqual([
      new ReturnProductDto(productRepository.products[0]),
      new ReturnProductDto(productRepository.products[1]),
    ]);
  });

  it('should search correctly with a selected page', async () => {
    const productRepository = new InMemoryProductsRepository();
    const findProductByNameContaining = new FindProductByNameContainingUseCase(
      productRepository,
    );

    for (let i = 1; i <= 9; i++) {
      productRepository.create(makeProduct(`product${i}`));
    }
    productRepository.create(makeProduct('shampoo'));

    const products = await findProductByNameContaining.execute('produ', 2, 3);
    expect(products.data.length).toBe(2);
    expect(products.meta.currentPage).toBe(3);
    expect(products.meta.itemsPerPage).toBe(2);
    expect(products.meta.totalItems).toBe(9);
    expect(products.meta.totalPages).toBe(5);
    expect(products.data).toEqual([
      new ReturnProductDto(productRepository.products[4]),
      new ReturnProductDto(productRepository.products[5]),
    ]);
  });
});
