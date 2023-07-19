import { Video } from 'src/videos/entities/video.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ nullable: true })
  imgProfile: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: string;

  @Column({ name: 'lastvideo', nullable: true })
  lastvideo: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    array: true,
    default: [UserRole.CUSTOMER],
  })
  roles: UserRole[];

  @ManyToOne(() => Video, (video) => video.user)
  @JoinColumn({ name: 'lastvideo', referencedColumnName: 'id' })
  video: Video;
}
