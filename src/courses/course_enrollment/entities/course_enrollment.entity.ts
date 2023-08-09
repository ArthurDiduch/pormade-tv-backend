import { Course } from 'src/courses/courses/entities/course.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CourseEnrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  date: Date;

  @Column()
  user: number;

  @Column()
  course: number;

  @ManyToOne(() => User, (user) => user.courseEnrollment)
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  id_user: User;

  @ManyToOne(() => Course, (course) => course.courseEnrollment)
  @JoinColumn({ name: 'course', referencedColumnName: 'id' })
  id_course: Course;
}
