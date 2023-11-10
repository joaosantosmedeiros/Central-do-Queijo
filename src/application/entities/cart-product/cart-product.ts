import { Product } from '../product/product';
import { Replace } from '@helpers/replace';
import { randomUUID } from 'crypto';
import { Cart } from '../cart/cart';

export interface CartProductProps {
  cartId: string;
  cart?: Cart;
  productId: string;
  product?: Product;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

export class CartProduct {
  private _id: string;
  private props: CartProductProps;

  constructor(
    props: Replace<CartProductProps, { createdAt?: Date; updatedAt?: Date }>,
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

  public get cartId() {
    return this.props.cartId;
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

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
