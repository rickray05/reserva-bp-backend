import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  private _createUserDto: CreateUserDto;
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto): Promise<User> {
    this._createUserDto = createUserDto;
    const user = this.repository.create(this._createUserDto);
    return this.repository.save(user);
  }
  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateItemDto: UpdateUserDto): Promise<User> {
    const user = await this.repository.preload({
      id: id,
      ...updateItemDto,
    });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = { ...user, password: hashedPassword }
    return this.repository.save(newUser);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.repository.remove(user);
  }

  async findByEmail(email) {
    const user = await this.repository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    return user;
  }

  async isClient(userId) {
    const user = await this.findOne(userId);

    if (user && user.type === 1) {
      return true;
    }

    return false;
  }

  async findBrokers() {
    const user = await this.repository
      .createQueryBuilder()
      .where('type = 2')
      .getMany();

    return user;
  }
}
