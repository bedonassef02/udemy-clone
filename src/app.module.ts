import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { configSchemaValidation } from './utils/validation/config-schema.validation';
import { CoursesModule } from './courses/courses.module';
import { CategoriesModule } from './categories/categories.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './auth/guards/role.guard';
import {EnrollmentModule} from "./enrollment/enrollment.module";
import {SectionsModule} from "./sections/sections.module";
import {VideosModule} from "./videos/videos.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      validationSchema: configSchemaValidation,
    }),
    UsersModule,
    AuthModule,
    DatabaseModule,
    CoursesModule,
    CategoriesModule,
      EnrollmentModule,
      SectionsModule,
      VideosModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
