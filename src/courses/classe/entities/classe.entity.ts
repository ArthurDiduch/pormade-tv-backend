import { CourseModule } from 'src/courses/course_module/entities/course_module.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Classe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  order: number;

  @Column()
  module: number;

  @ManyToOne(() => CourseModule, (coursemodule) => coursemodule.classe)
  @JoinColumn({ name: 'module', referencedColumnName: 'id' })
  course_module: CourseModule;
}
