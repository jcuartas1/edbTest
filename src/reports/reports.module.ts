import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { MongoReport, ReportSchema } from './report.mongo.entity';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{
      name: MongoReport.name,
      schema: ReportSchema
    }])
  ],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
