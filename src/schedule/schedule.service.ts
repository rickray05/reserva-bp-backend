import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { UserService } from '../user/user.service';
import { utils } from '../utils/utils';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly repository: Repository<Schedule>,
    private userService: UserService,
  ) {}
  async create(createScheduleDto: CreateScheduleDto, user) {
    const isClient = await this.userService.isClient(user.userId);
    if (!isClient) {
      throw new HttpException(
        'Apenas clientes podem criar uma agenda.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isBusy = await this.validateScheduleBroker(
      createScheduleDto.brokerId,
      createScheduleDto.schedule_start_at,
    );

    if (isBusy) {
      throw new HttpException(
        'Este consultor já tem uma agenda neste intervalo de horário.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const intervalTime = utils.diff(
      createScheduleDto.schedule_end_at,
      createScheduleDto.schedule_start_at,
    );

    if (intervalTime > 120 || intervalTime < 30) {
      throw new HttpException(
        'Só podem ser agendadas reuniões no perído de 30 minutos a 2 horas.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const roomIsBusy = await this.validateScheduleRoom(
      createScheduleDto.roomId,
      createScheduleDto.schedule_start_at,
    );

    if (roomIsBusy) {
      throw new HttpException(
        'Essa sala já está reservada para esse período.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const createSchedule = {
      ...createScheduleDto,
      clientId: user.userId,
    };

    const schedule = this.repository.create(createSchedule);
    return this.repository.save(schedule);
  }

  listSchedue(user) {
    const schedules = this.repository
      .createQueryBuilder('schedule')
      .innerJoin('user', 'client', 'client.id = schedule.clientId')
      .innerJoin('user', 'broker', 'broker.id = schedule.brokerId')
      .innerJoin('room', 'r', 'r.id = schedule.roomId')
      .select([
        'client.name as client_name',
        'broker.name as brooker_name',
        'r.name as room_name',
        'schedule',
      ]);

    const userId = user.userId;
    if (user.type === 1) {
      schedules.where('schedule.clientId = :userId', { userId });
    } else {
      schedules.where('schedule.brokerId = :userId', { userId });
    }

    return schedules.getRawMany();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }

  async validateScheduleBroker(brokerId, start_at) {
    return await this.repository
      .createQueryBuilder()
      .where(
        'schedule_start_at <= :start_at and schedule_end_at > :start_at and brokerId = :brokerId',
        { start_at, brokerId },
      )
      .getExists();
  }

  async validateScheduleRoom(roomId, start_at) {
    return await this.repository
      .createQueryBuilder()
      .where(
        'schedule_start_at <= :start_at and schedule_end_at > :start_at and roomId = :roomId',
        { start_at, roomId },
      )
      .getExists();
  }
}
