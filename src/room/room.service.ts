import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly repository: Repository<Room>,
  ) {}
  async create(createRoomDto: CreateRoomDto, user) {
    await this.isConsult(user);

    const numberRooms = await this.repository.count();

    if (numberRooms === 8) {
      throw new HttpException(
        'Já existe 8 salas cadastradas, que é o número máximo permitido!.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const room = this.repository.create(createRoomDto);

    return this.repository.save(room);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.repository.preload({
      id: id,
      ...updateRoomDto,
    });
    if (!room) {
      throw new NotFoundException(`Room ${id} not found`);
    }
    return this.repository.save(room);
  }

  async remove(id: number) {
    const room = await this.findOne(id);
    return this.repository.remove(room);
  }

  async isConsult(user) {
    if (user.type === 1) {
      throw new HttpException(
        'Apenas consultores podem cadastrar ou editar uma sala.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
