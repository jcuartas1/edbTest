import { Module } from '@nestjs/common';
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
    MongooseModule.forRoot(process.env.HOSTDATABASE), 
    ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
