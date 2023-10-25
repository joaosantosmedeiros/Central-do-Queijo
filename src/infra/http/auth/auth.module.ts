import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth-controller';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FindAccountByEmailUseCase } from '@application/usecases/account-usecases';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  providers: [AuthService, FindAccountByEmailUseCase],
  controllers: [AuthController],
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
})
export class AuthModule {}
