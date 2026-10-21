import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module.js';

@Module({
  imports: [ConfigModule.forRoot(), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
