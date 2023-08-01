import { User } from 'src/users/entities/user.entity';
import { Video } from 'src/videos/entities/video.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user' })
  user: number;

  @Column()
  video: number;

  @ManyToOne(() => User, (user) => user.idFavorite)
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  idUser: User;

  @ManyToOne(() => Video, (video) => video.idFavorite)
  @JoinColumn({ name: 'video' })
  idVideo: Video;
}
