import { Replace } from '@helpers/replace';
import { randomUUID } from 'crypto';

export interface PaymentStatusProps {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class PaymentStatus {
  private _id: string;
  private props: PaymentStatusProps;

  constructor(
    props: Replace<PaymentStatusProps, { createdAt?: Date; updatedAt?: Date }>,
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

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
