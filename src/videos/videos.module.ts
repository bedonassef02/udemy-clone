import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './entities/video.entity';
import {UsersModule} from "../users/users.module";
import {EnrollmentModule} from "../enrollment/enrollment.module";
import {AuthModule} from "../auth/auth.module";
import {AuthMiddleware} from "../auth/middlewares/auth.middleware";
import {IsUserUpdatedMiddleware} from "../auth/middlewares/is-user-updated.middleware";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    AuthModule,
    UsersModule,
    EnrollmentModule,
  ],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware, IsUserUpdatedMiddleware)
      .forRoutes(VideosController);
  }
}
