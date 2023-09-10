import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Section, SectionSchema } from './entities/section.entity';
import { VideosModule } from './videos/videos.module';
import { AuthMiddleware } from '../../auth/middlewares/auth.middleware';
import { IsUserUpdatedMiddleware } from '../../auth/middlewares/is-user-updated.middleware';
import { AuthModule } from '../../auth/auth.module';
import { UsersModule } from '../../users/users.module';
import { EnrollmentModule } from '../enrollment/enrollment.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Section.name, schema: SectionSchema }]),
    AuthModule,
    UsersModule,
    VideosModule,
    EnrollmentModule,
  ],
  controllers: [SectionsController],
  providers: [SectionsService],
})
export class SectionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware, IsUserUpdatedMiddleware)
      .forRoutes(SectionsController);
  }
}
