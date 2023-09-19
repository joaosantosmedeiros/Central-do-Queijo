import { InMemoryAccountRepository } from '@test/repositories/in-memory-accounts-repository';
import { ListAllAccountsUseCase } from './list-accounts-usecase';
import { makeAccount } from '@test/factories/account-factory';

describe('List Accounts Usecase', () => {
  it('should list all accounts properly', async () => {
    const inMemoryAccountRepository = new InMemoryAccountRepository();
    const listAllAccounts = new ListAllAccountsUseCase(
      inMemoryAccountRepository,
    );

    await inMemoryAccountRepository.create(makeAccount());
    await inMemoryAccountRepository.create(
      makeAccount('another_mail@mail.com'),
    );
    await inMemoryAccountRepository.create(
      makeAccount('another_mail2@mail.com'),
    );

    const accounts = await listAllAccounts.execute();

    expect(accounts.length).toBe(3);
  });
});
