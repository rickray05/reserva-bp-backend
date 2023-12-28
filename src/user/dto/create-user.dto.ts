import { IsEnum, IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { TypeUser } from '../enum/type-user';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ example: 'Carlos Henrique' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'exemple@bemprotege.com.br' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    enum: TypeUser,
    example: [TypeUser.BROKERS, TypeUser.CLIENT],
  })
  @IsEnum(TypeUser)
  @IsNotEmpty()
  type: number;
}
