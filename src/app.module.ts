import { DatabaseModule } from '@infra/database/database.module';
import { RolesGuard } from '@infra/http/guards/roles.guard';
import { HttpModule } from '@infra/http/http.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [HttpModule, DatabaseModule, JwtModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
