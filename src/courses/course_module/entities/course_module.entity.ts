import { Course } from 'src/courses/courses/entities/course.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CourseModule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  order: number;

  @Column()
  course: number;

  @ManyToMany(() => Course, (course) => course.module)
  @JoinColumn({ name: 'course', referencedColumnName: 'id' })
  courseModule: Course;
}
