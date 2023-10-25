import { Account } from '@application/entities/account/account';
import { FindAccountByEmailUseCase } from '@application/usecases/account-usecases';
import { LoginDto } from '@infra/http/dto/login-body';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly findAccountByEmailUseCase: FindAccountByEmailUseCase,
  ) {}
  async login(loginDto: LoginDto): Promise<Account | null> {
    const account = await this.findAccountByEmailUseCase.execute(
      loginDto.email,
    );

    const passwordMatches = await bcrypt.compare(
      loginDto.password,
      account?.password ? account?.password : '',
    );

    if (!passwordMatches || !account) {
      throw new HttpException('Invalid mail or password', HttpStatus.FORBIDDEN);
    }

    return account;
  }
}
