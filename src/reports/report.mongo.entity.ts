import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from '@nestjs/swagger';
import { Document } from "mongoose";

@Schema()
export class MongoReport extends Document{
  
    @ApiProperty({
        example: '200',
        description: 'Report Price'
      })
    @Prop()
    price: number;
    
    @ApiProperty({
        example: 'New Report Test',
        description: 'Report Title'
      })
    @Prop()
    title: string;
    
    @ApiProperty({
        example: 'Laboris enim et ea nulla anim nisi Lorem.',
        description: 'Report Description'
      })
    @Prop()
    description: string;
    
    @ApiProperty({
        example: 'In do consequat nulla aliqua excepteur deserunt amet sint ea magna eu in eu.',
        description: 'Report Content'
      })
    @Prop()
    content: string;
}

export const ReportSchema = SchemaFactory.createForClass( MongoReport );