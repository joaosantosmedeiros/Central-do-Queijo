import { Product } from '@application/entities/product/product';

export abstract class ProductRepository {
  public products: Product[];

  abstract findById(id: string): Promise<Product | null>;
  abstract findByName(name: string): Promise<Product | null>;
  abstract list(): Promise<Product[]>;
  abstract create(product: Product): Promise<void>;
  abstract update(
    id: string,
    props: {
      name: string;
      categoryId: string;
    },
  ): Promise<Product>;
  abstract delete(id: string): Promise<void>;
}
