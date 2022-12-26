import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ReportsModule } from './reports/reports.module';
import { EnvConfiguration } from './config/app.config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
      isGlobal: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','swagger-static'),
      serveRoot: process.env.NODE_ENV === 'dev' ? '/' : '/swagger',
    }),
    MongooseModule.forRoot(process.env.HOSTDATABASE), 
    ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
