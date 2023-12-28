import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  MinDate,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateScheduleDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsNotEmpty()
  brokerId: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsNotEmpty()
  roomId: number;

  @ApiProperty({ example: '2023-12-26 12:30:00' })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @MinDate(new Date())
  schedule_start_at: string;

  @ApiProperty({ example: '2023-12-26 12:30:00' })
  @IsDateString()
  @IsNotEmpty()
  schedule_end_at: string;
}
