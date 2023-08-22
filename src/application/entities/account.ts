import { Replace } from '@helpers/replace';
import { randomUUID } from 'crypto';

export interface AccountProps {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class Account {
  private _id: string;
  private props: AccountProps;

  constructor(
    props: Replace<
      AccountProps,
      { isAdmin?: boolean; updatedAt?: Date; createdAt?: Date }
    >,
    id?: string,
  ) {
    if (props.name.length < 5) {
      throw new Error('Name length must be greater than 4 characters');
    }
    if (props.password.length < 8) {
      throw new Error('Password length must be greater than 8 characters');
    }

    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      isAdmin: props.isAdmin ?? false,
      updatedAt: props.updatedAt ?? new Date(),
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }
  public set name(name: string) {
    this.props.name = name;
    this.props.updatedAt = new Date();
  }

  public get email(): string {
    return this.props.email;
  }
  public set email(email: string) {
    this.props.email = email;
    this.props.updatedAt = new Date();
  }

  public get password(): string {
    return this.props.password;
  }
  public set password(password: string) {
    this.props.password = password;
  }

  public get isAdmin(): boolean {
    return this.props.isAdmin;
  }
  public set isAdmin(isAdmin: boolean) {
    this.props.isAdmin = isAdmin;
    this.props.updatedAt = new Date();
  }

  public get deletedAt(): Date | null | undefined {
    return this.props.deletedAt;
  }
  public set deletedAt(deletedAt: Date) {
    this.props.deletedAt = deletedAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
