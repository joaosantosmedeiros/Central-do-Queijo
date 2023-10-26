import { FindAccountByEmailUseCase } from '@application/usecases/account-usecases';
import { LoginDto } from '@infra/http/dto/body/login-body';
import { ReturnLoginDto } from '@infra/http/dto/return/return-login-dto';
import { LoginPayload } from '@infra/http/dto/return/return-login-payload';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly findAccountByEmailUseCase: FindAccountByEmailUseCase,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto): Promise<ReturnLoginDto> {
    const account = await this.findAccountByEmailUseCase.execute(
      loginDto.email,
    );

    const passwordMatches = await bcrypt.compare(
      loginDto.password,
      account?.password ? account?.password : '',
    );

    if (!passwordMatches || !account || !account.isActive) {
      throw new HttpException('Invalid mail or password', HttpStatus.FORBIDDEN);
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(account) }),
      account,
    };
  }
}
