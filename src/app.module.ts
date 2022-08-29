import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
// import { AuthMiddleware } from './core/middleware';
import { JwtService } from '@nestjs/jwt';
import { AppGateway } from './app.gateway';
import { GameEventsGateway } from './game/game.gateway';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/test-api', {
      useNewUrlParser: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, GameEventsGateway],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   public configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .forRoutes({ path: '/api/', method: RequestMethod.ALL });
//   }
// }
