import { ContentClass } from 'src/courses/content_class/entities/content_class.entity';
import { CourseModule } from 'src/courses/course_module/entities/course_module.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => ContentClass, (contentClass) => contentClass.class)
  contentClass: ContentClass;
}
