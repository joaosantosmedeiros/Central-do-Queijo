import { InMemoryAccountRepository } from '@test/repositories/in-memory-accounts-repository';
import {
  UpdateAccountRequest,
  UpdateAccountUseCase,
} from './update-account-usecase';
import { makeAccount } from '@test/factories/account-factory';

describe('UpdateAccountUseCase', () => {
  it('should update an account correctly', async () => {
    const inMemoryAccountRepository = new InMemoryAccountRepository();
    const updateAccountUseCase = new UpdateAccountUseCase(
      inMemoryAccountRepository,
    );

    await inMemoryAccountRepository.create(makeAccount());

    const request: UpdateAccountRequest = {
      email: 'any_mail@mail.com',
      props: {
        newEmail: 'updated_email@mail.com',
        newName: 'updated_name',
        newPassword: 'updated_password',
      },
    };

    const account = await updateAccountUseCase.execute(request);

    expect(account.email).toBe('updated_email@mail.com');
    expect(account.name).toBe('updated_name');
    expect(account.password).toBe('updated_password');
  });

  it('should throw an error if an invalid email is passed', async () => {
    const inMemoryAccountRepository = new InMemoryAccountRepository();
    const updateAccountUseCase = new UpdateAccountUseCase(
      inMemoryAccountRepository,
    );

    const request: UpdateAccountRequest = {
      email: 'any_mail@mail.com',
      props: {
        newEmail: 'updated_email@mail.com',
        newName: 'updated_name',
        newPassword: 'updated_password',
      },
    };

    expect(
      async () => await updateAccountUseCase.execute(request),
    ).rejects.toThrow();
  });
});
