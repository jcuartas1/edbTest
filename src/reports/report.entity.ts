import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Report {

    @ApiProperty({
        example: '1',
        description: 'Id Report',
        uniqueItems: true
      })
    @PrimaryGeneratedColumn() 
    id: number;
    
    @ApiProperty({
        example: '200',
        description: 'Report Price'
      })
    @Column()
    price: number;
    
    @ApiProperty({
        example: 'New Report Test',
        description: 'Report Title'
      })
    @Column()
    title: string;
    
    @ApiProperty({
        example: 'Laboris enim et ea nulla anim nisi Lorem.',
        description: 'Report Description'
      })
    @Column()
    description: string;
    
    @ApiProperty({
        example: 'In do consequat nulla aliqua excepteur deserunt amet sint ea magna eu in eu.',
        description: 'Report Content'
      })
    @Column()
    content: string;

    
}