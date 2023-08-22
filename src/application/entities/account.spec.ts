import { Account } from './account';

describe('Account', () => {
  it('should be able to create a new account', () => {
    const account = new Account({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    expect(account).toBeTruthy();
  });

  it('should create a new account with correct date values', () => {
    const account = new Account({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    expect(account.updatedAt).toEqual(account.createdAt);
  });

  it('should change updatedAt field if one or more fields are changed', async () => {
    const account = new Account({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
    const oldUpdatedAt = account.updatedAt;

    await new Promise((res) => setTimeout(res, 1000));

    account.email = 'another_email';
    const newUpdatedAt = account.updatedAt;

    expect(oldUpdatedAt).not.toEqual(newUpdatedAt);
  });

  it('should throw an error if an account is created with a short username', async () => {
    expect(() => {
      new Account({
        name: 'any',
        email: 'any_email@mail.com',
        password: 'any_password',
      });
    }).toThrow();
  });

  it('should throw an error if an account is created with a short password', async () => {
    expect(() => {
      new Account({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'pass',
      });
    }).toThrow();
  });
});
