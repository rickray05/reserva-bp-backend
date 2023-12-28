import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUserLoggedId } from '../auth/decorators/current-user.decorator';

@Controller('room')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Salas')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @ApiOperation({ summary: 'Criar Sala' })
  @Post()
  create(@Body() createRoomDto: CreateRoomDto, @CurrentUserLoggedId() user) {
    return this.roomService.create(createRoomDto, user);
  }
  @ApiOperation({ summary: 'Buscar todas as Salas' })
  @Get()
  findAll() {
    return this.roomService.findAll();
  }
  @ApiOperation({ summary: 'Buscar um única sala.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }
  @ApiOperation({ summary: 'Atualizar sala' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }
  @ApiOperation({ summary: 'Remover sala' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }
}
