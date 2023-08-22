import { InMemoryAccountRepository } from '@test/repositories/in-memory-accounts-repository';
import { CreateAccountUseCase } from './create-account-usecase';
import { EmailInUseError } from './errors/email-in-use-error';

describe('Create Account Use Case', () => {
  it('should be able to create a new account', async () => {
    const accountsRepository = new InMemoryAccountRepository();
    const createAccountUseCase = new CreateAccountUseCase(accountsRepository);

    const { account } = await createAccountUseCase.execute({
      email: 'any_mail@mail.com',
      password: 'any_password',
      name: 'any_name',
    });

    expect(account).toBeTruthy();
  });

  it('should not be able to create an account with an used email', async () => {
    const accountsRepository = new InMemoryAccountRepository();
    const createAccountUseCase = new CreateAccountUseCase(accountsRepository);

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
    }).rejects.toThrow(EmailInUseError);
  });
});
