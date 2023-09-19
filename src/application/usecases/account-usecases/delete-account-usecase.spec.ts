import { InMemoryAccountRepository } from '@test/repositories/in-memory-accounts-repository';
import { DeleteAccountUseCase } from './delete-account-usecase';
import { makeAccount } from '@test/factories/account-factory';

describe('DeleteAccountUseCase', () => {
  it('should delete an account correctly', async () => {
    const inMemoryAccountRepository = new InMemoryAccountRepository();
    const deleteAccountUseCase = new DeleteAccountUseCase(
      inMemoryAccountRepository,
    );

    await inMemoryAccountRepository.create(makeAccount());
    const email = 'any_mail@mail.com';
    await deleteAccountUseCase.execute(email);

    expect(inMemoryAccountRepository.accounts.length).toBe(0);
  });

  it('should not delete an account if an invalid  email is passed', async () => {
    const inMemoryAccountRepository = new InMemoryAccountRepository();
    const deleteAccountUseCase = new DeleteAccountUseCase(
      inMemoryAccountRepository,
    );

    await inMemoryAccountRepository.create(makeAccount());
    const email = 'invalid_mail@mail.com';
    expect(
      async () => await deleteAccountUseCase.execute(email),
    ).rejects.toThrow();
  });
});
