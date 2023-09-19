import { Replace } from '@helpers/replace';
import { randomUUID } from 'crypto';

export interface AccountProps {
  name: string;
  email: string;
  password: string;
  userType: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Account {
  private _id: string;
  private props: AccountProps;

  constructor(
    props: Replace<
      AccountProps,
      {
        isActive?: boolean;
        updatedAt?: Date;
        createdAt?: Date;
        userType?: number;
      }
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
      userType: props.userType ?? 1,
      updatedAt: props.updatedAt ?? new Date(),
      createdAt: props.createdAt ?? new Date(),
      isActive: props.isActive ?? true,
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

  public get userType(): number {
    return this.props.userType;
  }
  public set userType(userType: number) {
    this.props.userType = userType;
    this.props.updatedAt = new Date();
  }

  public get isActive(): boolean {
    return this.props.isActive;
  }
  public set isActive(isActive: boolean) {
    this.props.isActive = isActive;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
