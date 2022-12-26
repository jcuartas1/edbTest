import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateReportDto } from './dtos/create-report.dto';
import { UpdateReportDto } from './dtos/upadate-report.dto';
import { Report } from './report.entity';
import { ReportsService } from './reports.service';
import { MongoReport } from './report.mongo.entity';


@ApiTags('REPORT')
@Controller('reports')
export class ReportsController {

  constructor(private reportsService: ReportsService){}


  @Post()
  @ApiResponse({
    status: 201,
    description: 'was created succefully',
    type: MongoReport,
  })
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  async createReport(@Body() body: CreateReportDto){
    this.reportsService.create(body)
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'was searched succefully',
    type: MongoReport
  })
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Report Not Found'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  async findAll(){
    return await this.reportsService.find();
  }

  @Get('/:idsearch')
  @ApiResponse({
    status: 200,
    description: 'was searched succefully',
    type: MongoReport,
  })
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Report Not Found'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  async findOne(@Param('idsearch') id:string){
    const report =  await this.reportsService.findOne(id);
    if(!report) {
      throw new NotFoundException('report not found')
    }
    return report
  }

  @Patch('/:idsearch')
  @ApiResponse({
    status: 200,
    description: 'was updated succefully'
  })
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Report Not Found'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  async updateReport(@Param('idsearch') id:string, @Body() body: UpdateReportDto){
    return await this.reportsService.update(id, body);
  }

  @Delete('/:idsearch')
  @ApiResponse({
    status: 200,
    description: 'was delated succefully'
  })
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Report Not Found'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  async removeReport(@Param('idsearch') id:string){
    return this.reportsService.remove(id)
  }

}
