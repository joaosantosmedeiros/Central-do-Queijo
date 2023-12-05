import { InMemoryAccountRepository } from '@test/repositories/in-memory-accounts-repository';
import { makeAccount } from '@test/factories/account-factory';
import { EntityNotFoundException } from '@infra/http/exceptions/entity-not-found-exception';
import { FindAccountByIdUseCase } from './find-account-by-id-usecase';

describe('FindAccountByEmailUseCase', () => {
  it('should find an account correctly', async () => {
    const accountRepository = new InMemoryAccountRepository();
    const findAccountById = new FindAccountByIdUseCase(accountRepository);

    const account = makeAccount();
    await accountRepository.create(account);

    const foundAccount = findAccountById.execute(account.id);

    expect(foundAccount).toBeTruthy();
  });

  it('should throw if no account is found', async () => {
    const accountRepository = new InMemoryAccountRepository();
    const findAccountById = new FindAccountByIdUseCase(accountRepository);

    async () => {
      expect(await findAccountById.execute('fake_id')).rejects.toThrow(
        EntityNotFoundException,
      );
    };
  });
});
