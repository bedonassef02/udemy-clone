import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { AuthModule } from '../auth/auth.module';
import { IsUserUpdatedMiddleware } from '../auth/middlewares/is-user-updated.middleware';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    AuthModule,
    UsersModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware, IsUserUpdatedMiddleware)
      .exclude(
        {
          path: 'categories',
          method: RequestMethod.GET,
        },
        {
          path: 'categories/:id',
          method: RequestMethod.GET,
        },
      )
      .forRoutes(CategoriesController);
  }
}
