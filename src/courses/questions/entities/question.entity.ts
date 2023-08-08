import { Activity } from 'src/courses/activities/entities/activity.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  activity: number;

  @ManyToOne(() => Activity, (activity) => activity.question)
  @JoinColumn({ name: 'activity', referencedColumnName: 'id' })
  id_activity: Activity;
}
