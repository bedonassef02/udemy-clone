import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Coupon, CouponSchema } from './entities/coupon.entity';
import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { IsUserUpdatedMiddleware } from '../auth/middlewares/is-user-updated.middleware';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coupon.name, schema: CouponSchema }]),
    AuthModule,
    UsersModule,
  ],
  controllers: [CouponsController],
  providers: [CouponsService],
})
export class CouponsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware, IsUserUpdatedMiddleware)
      .forRoutes(CouponsController);
  }
}
