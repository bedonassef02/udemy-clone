import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { configSchemaValidation } from './utils/validation/config-schema.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      validationSchema: configSchemaValidation,
    }),
    UsersModule,
    AuthModule,
    DatabaseModule,
  ],
})
export class AppModule {}
