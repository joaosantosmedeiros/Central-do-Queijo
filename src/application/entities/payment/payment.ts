import { Replace } from '@helpers/replace';
import { randomUUID } from 'crypto';
import { PaymentStatus } from '../../../enums/payment-status.enum';

export interface PaymentProps {
  status: PaymentStatus;
  price: number;
  discount: number;
  finalPrice: number;
  code: string;
  paymentDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Payment {
  private _id: string;
  private props: PaymentProps;

  constructor(
    props: Replace<
      PaymentProps,
      {
        status?: PaymentStatus;
        finalPrice?: number;
        paymentDate?: Date;
        createdAt?: Date;
        updatedAt?: Date;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      finalPrice: props.price * (1 - props.discount / 100),
      status: props.status ?? PaymentStatus.PENDING,
    };
    if (this.finalPrice > this.price || this.discount < 0) {
      throw new Error("Discount can't be negative");
    }
  }

  public get id() {
    return this._id;
  }

  public get status() {
    return this.props.status;
  }

  public get price() {
    return this.props.price;
  }
  public set price(price: number) {
    this.props.price = price;
    this.props.finalPrice = price * (1 - this.props.discount / 100);
    this.props.updatedAt = new Date();
  }

  public get discount() {
    return this.props.discount;
  }
  public set discount(discount: number) {
    this.props.discount = discount;
    this.props.finalPrice = this.props.price * (1 - discount / 100);
    this.props.updatedAt = new Date();
  }

  public get finalPrice() {
    return this.props.finalPrice;
  }

  public get code() {
    return this.props.code;
  }

  public get paymentDate() {
    return this.props.paymentDate;
  }

  pay() {
    if (this.props.status === PaymentStatus.DONE || this.props.paymentDate) {
      throw new Error('Payment already done.');
    }

    this.props.paymentDate = new Date();
    this.props.status = PaymentStatus.DONE;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
