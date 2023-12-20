import { Replace } from '@helpers/replace';
import { randomUUID } from 'crypto';
import { OrderProduct } from '../order-product/order-product';
import { Account as RawAccount } from '@prisma/client';
import { Account } from '../account/account';

export interface OrderProps {
  accountId: string;
  date: Date;
  paymentId: string;
  createdAt: Date;
  updatedAt: Date;
  OrderProduct?: OrderProduct[];
  account?: RawAccount;
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
      account: props.account ? new Account(props.account) : undefined,
    };
  }

  public get id() {
    return this._id;
  }

  public get account() {
    return this.props.account;
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

  public get OrderProduct() {
    return this.props.OrderProduct;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
