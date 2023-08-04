import { Video } from 'src/video/videos/entities/video.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './user-role.enum';
import { Favorite } from 'src/video/favorites/entities/favorite.entity';
import { Achievement } from 'src/achievements/achievements/entities/achievement.entity';

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

  @Column({
    nullable: true,
    unique: false,
    default:
      'data:image/png;base64,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',
  })
  imgProfile: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: string;

  @Column({ name: 'lastvideo', nullable: true })
  lastvideo: number;

  @Column({ name: 'videosWatched', default: 0 })
  videosWatched: number;

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

  @OneToMany(() => Favorite, (favorite) => favorite.idUser)
  idFavorite: Favorite[];

  @ManyToMany(() => Achievement, (achievement) => achievement.id_user)
  id_achievement: Achievement;
}
