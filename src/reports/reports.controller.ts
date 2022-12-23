import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateReportDto } from './dtos/create-report.dto';
import { UpdateReportDto } from './dtos/upadate-report.dto';
import { Report } from './report.entity';
import { ReportsService } from './reports.service';


@ApiTags('REPORT')
@Controller('reports')
export class ReportsController {

  constructor(private reportsService: ReportsService){}


  @Post()
  @ApiResponse({
    status: 201,
    description: 'was created succefully',
    type: Report,
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
    type: Report
  })
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Report Not Found'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  async findAll(){
    return await this.reportsService.find();
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'was searched succefully',
    type: Report,
  })
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Report Not Found'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  async findOne(@Param('id') id:string){
    const report =  await this.reportsService.findOne(parseInt(id));
    if(!report) {
      throw new NotFoundException('report not found')
    }
    return report
  }

  @Patch('/:id')
  @ApiResponse({
    status: 200,
    description: 'was updated succefully'
  })
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Report Not Found'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  async updateReport(@Param('id') id:string, @Body() body: UpdateReportDto){
    return await this.reportsService.update(parseInt(id), body);
  }

  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'was delated succefully'
  })
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Report Not Found'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  async removeReport(@Param('id') id:string){
    return this.reportsService.remove(parseInt(id))
  }

}
