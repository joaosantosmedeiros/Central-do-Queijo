import { CreateAccountUseCase } from '@application/usecases/create-account-usecase';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccountBody } from '../dto/create-account-body';
import { PasswordDontMatchException } from '../exceptions/password-dont-match-exception';
import { EmailInUseException } from '../exceptions/email-in-use-exception';

@Controller('account')
export class AccountController {
  constructor(private createAccountUseCase: CreateAccountUseCase) {}

  @Post()
  async create(@Body() body: CreateAccountBody) {
    const { name, email, password, confirmPassword } = body;
    if (password !== confirmPassword) {
      throw new PasswordDontMatchException();
    }

    try {
      const { account } = await this.createAccountUseCase.execute({
        name,
        email,
        password,
      });

      return { account };
    } catch (err: any) {
      if (err.code === 'P2002') {
        throw new EmailInUseException();
      }
    }
  }
}
