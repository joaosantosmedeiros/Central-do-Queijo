import { InMemoryAccountRepository } from '@test/repositories/in-memory-accounts-repository';
import {
  UpdateAccountRequest,
  UpdateAccountUseCase,
} from './update-account-usecase';
import { makeAccount } from '@test/factories/account-factory';
import { FindAccountByEmailUseCase } from './find-account-by-email-usecase';
import { EmailInUseException } from '@infra/http/exceptions/email-in-use-exception';

const makeSut = () => {
  const accountRepository = new InMemoryAccountRepository();
  const updateAccount = new UpdateAccountUseCase(
    accountRepository,
    new FindAccountByEmailUseCase(accountRepository),
  );

  return { updateAccount, accountRepository };
};

describe('UpdateAccountUseCase', () => {
  it('should update an account correctly', async () => {
    const { accountRepository, updateAccount } = makeSut();

    await accountRepository.create(makeAccount());

    const request: UpdateAccountRequest = {
      email: 'any_mail@mail.com',
      props: {
        newEmail: 'updated_email@mail.com',
        newName: 'updated_name',
        newPassword: 'updated_password',
      },
    };

    const account = await updateAccount.execute(request);

    expect(account.email).toBe('updated_email@mail.com');
    expect(account.name).toBe('updated_name');
    expect(account.password).toBe('updated_password');
  });

  it('should throw an erorr if an used email is passed', async () => {
    const { accountRepository, updateAccount } = makeSut();

    await accountRepository.create(makeAccount());
    await accountRepository.create(makeAccount('another_mail@mail.com'));

    expect(
      async () =>
        await updateAccount.execute({
          email: 'another_mail@mail.com',
          props: { newEmail: 'any_mail@mail.com' },
        }),
    ).rejects.toThrow(EmailInUseException);
  });

  it('should throw an error if an invalid email is passed', async () => {
    const { updateAccount } = makeSut();

    const request: UpdateAccountRequest = {
      email: 'any_mail@mail.com',
      props: {
        newEmail: 'updated_email@mail.com',
        newName: 'updated_name',
        newPassword: 'updated_password',
      },
    };

    expect(async () => await updateAccount.execute(request)).rejects.toThrow();
  });
});
