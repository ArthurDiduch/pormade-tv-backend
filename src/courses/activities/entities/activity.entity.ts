import { ContentClass } from 'src/courses/content_class/entities/content_class.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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
}
