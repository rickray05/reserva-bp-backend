import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { TypeUser } from '../enum/type-user';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 250 })
  name: string;

  @Column({ name: 'email', type: 'varchar', length: 250 })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 500 })
  password: string;

  @Column({ name: 'type', type: 'enum', enum: TypeUser })
  type: TypeUser;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
