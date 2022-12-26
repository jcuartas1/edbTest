
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { MongoReport } from './report.mongo.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Error, isValidObjectId, Model } from 'mongoose';
import { UpdateReportDto } from './dtos/upadate-report.dto';


@Injectable()
export class ReportsService {

  constructor( @InjectModel(MongoReport.name)
  private readonly repo: Model<MongoReport>,){}

  create(report: CreateReportDto){

    try {
      const reportCreate = this.repo.create(report)
      return reportCreate;
    } catch (error) {
      throw new InternalServerErrorException(`Can not create report - Check server logs`)
    }
    
  }

  find(){
    return this.repo.find();
  }

  async findOne(id: string){
    let report: MongoReport;
    if(!report && isValidObjectId(id)){
      report = await this.repo.findById(id); 
    }
    return report;
  }

  async update(id: string, updateReportDto: UpdateReportDto){
    const report = await this.findOne(id);
    if(!report){
      throw new NotFoundException('report not found');
    }

    try {
      await report.updateOne( updateReportDto, { new: true })
      return { ...report.toJSON(), ...updateReportDto };
    } catch (error) {
      throw new InternalServerErrorException(`Can not create report - Check server logs`)
    }
    
  }

  async remove(id: string){
    const { deletedCount } = await this.repo.deleteOne({ _id: id });
    if( deletedCount === 0 ){
      throw new BadRequestException(`Pokemon with id ${id} not found`)
    }
    return;
  }

}
