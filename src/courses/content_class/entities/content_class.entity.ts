import { Classe } from 'src/courses/classe/entities/classe.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ContentClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  classe: number;

  @Column()
  order: number;

  @ManyToOne(() => Classe, (classe) => classe.contentClass)
  @JoinColumn({ name: 'classe', referencedColumnName: 'id' })
  class: Classe;
}
