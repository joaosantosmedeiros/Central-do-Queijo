import { Replace } from '@helpers/replace';
import { randomUUID } from 'crypto';
import { OrderProduct } from '../order-product/order-product';
import { Account } from '../account/account';
import { Payment } from '../payment/payment';

export interface OrderProps {
  accountId: string;
  date: Date;
  paymentId: string;
  createdAt: Date;
  updatedAt: Date;
  OrderProduct?: OrderProduct[];
  payment?: Payment;
  account?: Account;
  productsAmount?: number;
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
      date: props.date ?? new Date(),
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

  public get payment() {
    return this.props.payment;
  }

  public get productsAmount() {
    return this.props.productsAmount;
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
