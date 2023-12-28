import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUserLoggedId } from '../auth/decorators/current-user.decorator';

@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Trazer dados Usuário Logado' })
  @Get('/me')
  async me(@CurrentUserLoggedId() user) {
    return user;
  }
  @ApiOperation({ summary: 'Criar Usuários' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new HttpException('Usuário já existe', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = { ...createUserDto, password: hashedPassword };

    return this.userService.create(newUser);
  }
  @ApiOperation({ summary: 'Buscar Todos os Usuários' })
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Buscar único Usuários' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }
  @ApiOperation({ summary: 'Atualizar Usuário' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @ApiOperation({ summary: 'Deletar Usuário' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(+id);
  }
}
