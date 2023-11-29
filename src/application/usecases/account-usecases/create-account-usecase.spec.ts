import { InMemoryAccountRepository } from '@test/repositories/in-memory-accounts-repository';
import { CreateAccountUseCase } from './create-account-usecase';
import { FindAccountByEmailUseCase } from './find-account-by-email-usecase';
import { EmailInUseException } from '@infra/http/exceptions/email-in-use-exception';

describe('Create Account Use Case', () => {
  it('should be able to create a new account', async () => {
    const accountsRepository = new InMemoryAccountRepository();
    const createAccountUseCase = new CreateAccountUseCase(
      accountsRepository,
      new FindAccountByEmailUseCase(accountsRepository),
    );

    const account = await createAccountUseCase.execute({
      email: 'any_mail@mail.com',
      password: 'any_password',
      name: 'any_name',
    });

    expect(account).toBeTruthy();
  });

  it('should not be able to create an account with an used email', async () => {
    const accountsRepository = new InMemoryAccountRepository();
    const createAccountUseCase = new CreateAccountUseCase(
      accountsRepository,
      new FindAccountByEmailUseCase(accountsRepository),
    );
    await createAccountUseCase.execute({
      email: 'any_mail@mail.com',
      password: 'any_password',
      name: 'any_name',
    });

    expect(async () => {
      await createAccountUseCase.execute({
        email: 'any_mail@mail.com',
        password: 'any_password',
        name: 'any_name',
      });
    }).rejects.toThrow(EmailInUseException);
  });
});
