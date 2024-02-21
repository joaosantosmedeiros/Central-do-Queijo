import { ProductRepository } from '@application/repositories/product-repository';
import { PaginationDto, PaginationMeta } from '@infra/http/dto/pagination-dto';
import { ReturnProductDto } from '@infra/http/dto/return/return-product-dto';
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
  ): Promise<PaginationDto<ReturnProductDto[]>> {
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
      products.map((product) => new ReturnProductDto(product)),
    );
  }
}
