import { Replace } from '@helpers/replace';
import { randomUUID } from 'crypto';

export interface CartProps {
  accountId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Cart {
  private _id: string;
  private props: CartProps;

  constructor(
    props: Replace<
      CartProps,
      { isActive?: boolean; createdAt?: Date; updatedAt?: Date }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      isActive: props.isActive ?? true,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public get accountId() {
    return this.props.accountId;
  }

  public get isActive() {
    return this.props.isActive;
  }
  public set isActive(isActive: boolean) {
    this.props.isActive = isActive;
    this.props.updatedAt = new Date();
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
