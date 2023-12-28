import { Product } from '@application/entities/product/product';
import { ProductRepository } from '@application/repositories/product-repository';

export class InMemoryProductsRepository implements ProductRepository {
  public products: Product[] = [];

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find((product) => product.id === id);
    return product ?? null;
  }

  async findByName(name: string): Promise<Product | null> {
    const product = this.products.find((product) => product.name === name);
    return product ?? null;
  }

  async findByNameContaining(
    search: string,
    size: number,
    page: number,
  ): Promise<[Product[], number]> {
    const products = this.products.filter((product) =>
      product.name.includes(search),
    );

    const start = size * (page - 1);
    const end = size * page;
    const pagedProducts = products.slice(start, end);

    return [pagedProducts, products.length];
  }

  async list(): Promise<Product[]> {
    return this.products;
  }

  async create(newProduct: Product): Promise<Product> {
    this.products.push(newProduct);
    return newProduct;
  }

  async update(
    id: string,
    props: { name: string; categoryId: string; price: number; image: string },
  ): Promise<Product> {
    const product = this.products.find((prduct) => prduct.id === id);
    if (!product) {
      throw new Error('Product not found');
    }

    product.name = props.name;
    product.categoryId = props.categoryId;
    product.image = props.image;
    product.price = props.price;

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
