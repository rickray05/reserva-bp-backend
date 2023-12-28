import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'class_number', type: 'integer', unique: true })
  class_number: number;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

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
