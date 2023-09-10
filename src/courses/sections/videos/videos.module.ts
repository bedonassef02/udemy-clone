import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './entities/video.entity';
import { AuthMiddleware } from '../../../auth/middlewares/auth.middleware';
import { IsUserUpdatedMiddleware } from '../../../auth/middlewares/is-user-updated.middleware';
import { AuthModule } from '../../../auth/auth.module';
import { UsersModule } from '../../../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    AuthModule,
    UsersModule,
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
