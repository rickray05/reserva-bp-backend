import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Schedule extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'clientId', type: 'integer' })
  clientId: number;

  @Column({ name: 'brokerId', type: 'integer' })
  brokerId: number;

  @Column({ name: 'roomId', type: 'integer' })
  roomId: number;

  @Column({ name: 'schedule_start_at', type: 'timestamp' })
  schedule_start_at: Date;

  @Column({ name: 'schedule_end_at', type: 'timestamp' })
  schedule_end_at: Date;

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
