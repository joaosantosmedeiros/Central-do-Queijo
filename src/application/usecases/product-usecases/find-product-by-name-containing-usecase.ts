import { Product } from '@application/entities/product/product';
import { ProductRepository } from '@application/repositories/product-repository';
import { PaginationDto, PaginationMeta } from '@infra/http/dto/pagination-dto';
import { Injectable } from '@nestjs/common';

const DEFAULT_PAGE_SIZE = 10;
const FIRST_PAGE = 1;

@Injectable()
export class FindProductByNameContainingUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(
    search: string,
    size = DEFAULT_PAGE_SIZE,
    page = FIRST_PAGE,
  ): Promise<PaginationDto<Product[]>> {
    const [products, count] = await this.productRepository.findByNameContaining(
      search,
      size,
      page,
    );

    return new PaginationDto(
      new PaginationMeta(
        Number(size),
        count,
        Number(page),
        Math.ceil(count / size),
      ),
      products,
    );
  }
}
