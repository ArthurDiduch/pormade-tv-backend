import { CourseCategory } from 'src/courses/course_category/entities/course_category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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
}
