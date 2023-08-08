import { Activity } from 'src/courses/activities/entities/activity.entity';
import { Classe } from 'src/courses/classe/entities/classe.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ContentClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bytea' })
  content: Buffer;

  @Column()
  classe: number;

  @Column()
  order: number;

  @ManyToOne(() => Classe, (classe) => classe.contentClass)
  @JoinColumn({ name: 'classe', referencedColumnName: 'id' })
  class: Classe;

  @OneToMany(() => Activity, (activity) => activity.contentClasses)
  activity: Activity[];
}
