import { CourseCategory } from 'src/courses/course_category/entities/course_category.entity';
import { CourseEnrollment } from 'src/courses/course_enrollment/entities/course_enrollment.entity';
import { CourseModule } from 'src/courses/course_module/entities/course_module.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  instructor: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  category: number;

  @ManyToOne(() => CourseCategory, (courseCategory) => courseCategory.course)
  @JoinColumn({ name: 'category', referencedColumnName: 'id' })
  courseCategory: CourseCategory;

  @OneToMany(() => CourseModule, (coursemodule) => coursemodule.courseModule)
  module: CourseModule[];

  @OneToMany(
    () => CourseEnrollment,
    (courseEnrollment) => courseEnrollment.id_course,
  )
  courseEnrollment: CourseEnrollment[];
}
