import { Replace } from '@helpers/replace';
import { randomUUID } from 'crypto';
import { Category } from '../category/category';

export interface ProductProps {
  name: string;
  price: number;
  image: string;
  categoryId: string;
  category?: Category;
  createdAt: Date;
  updatedAt: Date;
}

export class Product {
  private _id: string;
  private props: ProductProps;

  constructor(
    props: Replace<ProductProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this.props.name;
  }
  public set name(name: string) {
    this.props.name = name;
    this.props.updatedAt = new Date();
  }

  public get price() {
    return this.props.price;
  }
  public set price(price: number) {
    this.props.price = price;
    this.props.updatedAt = new Date();
  }

  public get image() {
    return this.props.image;
  }
  public set image(image: string) {
    this.props.image = image;
    this.props.updatedAt = new Date();
  }

  public get categoryId() {
    return this.props.categoryId;
  }
  public set categoryId(categoryId: string) {
    this.props.categoryId = categoryId;
    this.props.updatedAt = new Date();
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
