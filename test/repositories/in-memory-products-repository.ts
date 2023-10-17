import { Product } from '@application/entities/product/product';
import { ProductRepository } from '@application/repositories/product-repository';

export class InMemoryProductsRepository implements ProductRepository {
  public products: Product[] = [];
  public categoriesIds: string[] = [];

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find((product) => product.id === id);
    return product ?? null;
  }

  async findByName(name: string): Promise<Product | null> {
    const product = this.products.find((product) => product.name === name);
    return product ?? null;
  }

  async list(): Promise<Product[]> {
    return this.products;
  }

  async create(newProduct: Product): Promise<void> {
    if (!this.categoriesIds.find((id) => newProduct.categoryId === id)) {
      throw new Error('Category does not exists.');
    }
    this.products.push(newProduct);
  }

  async update(
    id: string,
    props: { name: string; categoryId: string },
  ): Promise<Product> {
    const product = this.products.find((prduct) => prduct.id === id);
    if (!product) {
      throw new Error('Product not found');
    }

    if (!this.categoriesIds.find((id) => props.categoryId === id)) {
      throw new Error('Category does not exists.');
    }

    product.name = props.name;
    product.categoryId = props.categoryId;

    return product;
  }

  async delete(id: string): Promise<void> {
    const index = this.products.findIndex((prduct) => prduct.id === id);

    if (index === -1) {
      throw new Error('Product not found');
    }

    this.products.splice(index, 1);
  }
}
