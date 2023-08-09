import { Question } from 'src/courses/questions/entities/question.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ResponseQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  response: string;

  @Column()
  status: boolean;

  @Column()
  question: number;

  @ManyToOne(() => Question, (question) => question.id_responseQuestion)
  @JoinColumn({ name: 'question', referencedColumnName: 'id' })
  id_question: Question;
}
