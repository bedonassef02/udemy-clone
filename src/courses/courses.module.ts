import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './entities/course.entity';
import { SectionsModule } from './sections/sections.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { IsUserUpdatedMiddleware } from '../auth/middlewares/is-user-updated.middleware';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    AuthModule,
    UsersModule,
    SectionsModule,
    EnrollmentModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware, IsUserUpdatedMiddleware)
      .exclude(
        {
          path: '/courses',
          method: RequestMethod.GET,
        },
        {
          path: '/courses/:id',
          method: RequestMethod.GET,
        },
      )
      .forRoutes(CoursesController);
  }
}
