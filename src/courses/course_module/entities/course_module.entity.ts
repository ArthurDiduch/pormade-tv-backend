import { Classe } from 'src/courses/classe/entities/classe.entity';
import { Course } from 'src/courses/courses/entities/course.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => Course, (course) => course.module)
  @JoinColumn({ name: 'course', referencedColumnName: 'id' })
  courseModule: Course;

  @OneToMany(() => Classe, (classe) => classe.course_module)
  classe: Classe[];
}
