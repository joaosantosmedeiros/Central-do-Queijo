import { Product } from '@application/entities/product/product';

export abstract class ProductRepository {
  abstract findById(id: string): Promise<Product | null>;
  abstract findByName(name: string): Promise<Product | null>;
  abstract findByNameContaining(
    search: string,
    size: number,
    page: number,
  ): Promise<[Product[], number]>;
  abstract list(
    productsId?: string[],
    isWithRelations?: boolean,
  ): Promise<Product[]>;
  abstract create(product: Product): Promise<Product>;
  abstract update(
    id: string,
    props: {
      name: string;
      categoryId: string;
      price: number;
      image: string;
    },
  ): Promise<Product>;
  abstract delete(id: string): Promise<void>;
}
