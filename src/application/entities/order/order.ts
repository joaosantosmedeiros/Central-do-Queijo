import { Replace } from '@helpers/replace';
import { randomUUID } from 'crypto';

export interface OrderProps {
  accountId: string;
  date: Date;
  paymentId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Order {
  private _id: string;
  private props: OrderProps;

  constructor(
    props: Replace<
      OrderProps,
      { date?: Date; createdAt?: Date; updatedAt?: Date }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      date: new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public get accountId() {
    return this.props.accountId;
  }

  public get date() {
    return this.props.date;
  }

  public get paymentId() {
    return this.props.paymentId;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
