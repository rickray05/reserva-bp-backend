import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUserLoggedId } from '../auth/decorators/current-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('schedule')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Agendamento')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  create(
    @Body() createScheduleDto: CreateScheduleDto,
    @CurrentUserLoggedId() user,
  ) {
    return this.scheduleService.create(createScheduleDto, user);
  }

  @Get()
  listSchedule(@CurrentUserLoggedId() user) {
    return this.scheduleService.listSchedue(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.scheduleService.update(+id, updateScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(+id);
  }
}
