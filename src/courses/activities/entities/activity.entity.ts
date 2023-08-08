import { ContentClass } from 'src/courses/content_class/entities/content_class.entity';
import { Question } from 'src/courses/questions/entities/question.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  contentClass: number;

  @ManyToOne(() => ContentClass, (contentClass) => contentClass.activity)
  @JoinColumn({ name: 'contentClass', referencedColumnName: 'id' })
  contentClasses: ContentClass;

  @OneToMany(() => Question, (question) => question.id_activity)
  question: Question[];
}
