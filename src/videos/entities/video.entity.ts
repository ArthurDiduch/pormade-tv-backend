import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  image: string;

  @Column({ unique: true })
  link: string;

  @Column({ unique: true })
  title: string;

  @Column()
  lauch: string;

  @Column({ unique: true })
  video_id: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: string;
}
