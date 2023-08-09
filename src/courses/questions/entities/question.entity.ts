import { Activity } from 'src/courses/activities/entities/activity.entity';
import { ResponseQuestion } from 'src/courses/response_questions/entities/response_question.entity';
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

  @ManyToOne(
    () => ResponseQuestion,
    (responsequestion) => responsequestion.id_question,
  )
  id_responseQuestion: ResponseQuestion[];
}
