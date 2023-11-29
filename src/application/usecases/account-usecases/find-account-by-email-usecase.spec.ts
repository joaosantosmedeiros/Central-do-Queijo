import { InMemoryAccountRepository } from '@test/repositories/in-memory-accounts-repository';
import { FindAccountByEmailUseCase } from './find-account-by-email-usecase';
import { makeAccount } from '@test/factories/account-factory';
import { EntityNotFoundException } from '@infra/http/exceptions/entity-not-found-exception';

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

  it('should throw if no account is found', async () => {
    const inMemoryAccountRepository = new InMemoryAccountRepository();
    const findAccountByEmailUseCase = new FindAccountByEmailUseCase(
      inMemoryAccountRepository,
    );

    const email = 'any_mail@mail.com';

    async () => {
      expect(await findAccountByEmailUseCase.execute(email)).rejects.toThrow(
        EntityNotFoundException,
      );
    };
  });
});
