import { Replace } from '@helpers/replace';
import { randomUUID } from 'crypto';

export interface ProductProps {
  name: string;
  categoryId: string;
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
