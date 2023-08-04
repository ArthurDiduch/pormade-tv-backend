import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CourseCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;
}
