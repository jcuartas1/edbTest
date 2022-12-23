
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportsService {

  constructor( @InjectRepository(Report) private repo: Repository<Report>){}

  create(report: CreateReportDto){
    const reportCreate = this.repo.create(report)
    return this.repo.save(reportCreate)
  }

  find(){
    return this.repo.find();
  }

  async findOne(id: number){
    return await this.repo.findOneBy({id})
  }

  async update(id: number, attrs: Partial<Report>){
    const report = await this.findOne(id);
    if(!report){
      throw new NotFoundException('report not found');
    }

    Object.assign(report, attrs);
    return this.repo.save(report);
  }

  async remove(id: number){
    const report = await this.findOne(id)
    if(!report) 
      throw new NotFoundException('report not found');

      return this.repo.remove(report)
  }

}
