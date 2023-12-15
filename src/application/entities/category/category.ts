import { Replace } from '@helpers/replace';
import { randomUUID } from 'crypto';

export interface CategoryProps {
  name: string;
  _count?: { Product: number };
  createdAt: Date;
  updatedAt: Date;
}

export class Category {
  private _id: string;
  private props: CategoryProps;

  constructor(
    props: Replace<CategoryProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      _count: props._count ?? undefined,
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

  public get count() {
    return this.props._count;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
