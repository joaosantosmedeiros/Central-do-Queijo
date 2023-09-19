import { InMemoryAccountRepository } from '@test/repositories/in-memory-accounts-repository';
import { FindAccountByEmailUseCase } from './find-account-by-email-usecase';
import { makeAccount } from '@test/factories/account-factory';

describe('FindAccountByEmailUseCase', () => {
  it('should find an account correctly', async () => {
    const inMemoryAccountRepository = new InMemoryAccountRepository();
    const findAccountByEmailUseCase = new FindAccountByEmailUseCase(
      inMemoryAccountRepository,
    );

    const email = 'any_mail@mail.com';
    await inMemoryAccountRepository.create(makeAccount(email));

    const account = findAccountByEmailUseCase.execute(email);

    expect(account).toBeTruthy();
  });

  it('should return null if no account is found', async () => {
    const inMemoryAccountRepository = new InMemoryAccountRepository();
    const findAccountByEmailUseCase = new FindAccountByEmailUseCase(
      inMemoryAccountRepository,
    );

    const email = 'any_mail@mail.com';

    const account = await findAccountByEmailUseCase.execute(email);

    expect(account).toBeNull();
  });
});
