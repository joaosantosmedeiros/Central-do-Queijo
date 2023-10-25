import { Account } from '@application/entities/account/account';
import { LoginDto } from '@infra/http/dto/login-body';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<Account | null> {
    return this.authService.login(loginDto);
  }
}
