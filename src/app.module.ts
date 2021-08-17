import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoLogMiddleware } from './common/mongolog.middleware';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MorganModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser : true,
      useUnifiedTopology : true,
      useCreateIndex : true,
      useFindAndModify : false
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor(process.env.MODE)
    }
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
      consumer
      .apply(MongoLogMiddleware)
      .forRoutes('*');
  }
}
