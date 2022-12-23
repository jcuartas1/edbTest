import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber} from 'class-validator';


export class UpdateReportDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  content: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price: number;
}