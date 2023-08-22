import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account-controller';
import { CreateAccountUseCase } from '@application/usecases/create-account-usecase';
import { DatabaseModule } from '@infra/database/database.module';
import { ListAllAccountsUseCase } from '@application/usecases/list-accounts-usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountController],
  providers: [CreateAccountUseCase, ListAllAccountsUseCase],
})
export class HttpModule {}
