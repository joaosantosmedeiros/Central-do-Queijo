import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account-controller';
import { CreateAccountUseCase } from '@application/usecases/account-usecases/create-account-usecase';
import { DatabaseModule } from '@infra/database/database.module';
import { ListAllAccountsUseCase } from '@application/usecases/account-usecases/list-accounts-usecase';
import { FindAccountByEmailUseCase } from '@application/usecases/account-usecases/find-account-by-email-usecase';
import { DeleteAccountUseCase } from '@application/usecases/account-usecases/delete-account-usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountController],
  providers: [
    CreateAccountUseCase,
    ListAllAccountsUseCase,
    FindAccountByEmailUseCase,
    DeleteAccountUseCase,
  ],
})
export class HttpModule {}
