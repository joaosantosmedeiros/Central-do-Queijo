import { Replace } from '@helpers/replace';
import { randomUUID } from 'crypto';
import { Order } from '../order/order';
import { Product } from '../product/product';

export interface OrderProductProps {
  orderId: string;
  order?: Order;
  productId: string;
  product?: Product;
  amount: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export class OrderProduct {
  private _id: string;
  private props: OrderProductProps;

  constructor(
    props: Replace<OrderProductProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      product: props.product ? new Product(props.product) : undefined,
    };
  }

  public get id() {
    return this._id;
  }

  public get orderId() {
    return this.props.orderId;
  }

  public get productId() {
    return this.props.productId;
  }

  public get amount() {
    return this.props.amount;
  }
  public set amount(amount: number) {
    this.props.amount = amount;
    this.props.updatedAt = new Date();
  }

  public get price() {
    return this.props.price;
  }
  public set price(price: number) {
    this.props.price = price;
    this.props.updatedAt = new Date();
  }

  public get product() {
    return this.props.product;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
