import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsNotEmpty()
  class_number: number;

  @ApiProperty({ example: 'Sala BP' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
