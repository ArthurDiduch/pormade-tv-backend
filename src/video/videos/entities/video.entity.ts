import { Category } from 'src/video/categories/entities/category.entity';
import { Favorite } from 'src/video/favorites/entities/favorite.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @Column({ nullable: true })
  duration: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: string;

  @Column({ name: 'category', nullable: true })
  category: number;

  @ManyToOne(() => Category, (category) => category.video)
  @JoinColumn({ name: 'category', referencedColumnName: 'id' })
  categories: Category;

  @OneToMany(() => User, (user) => user.video)
  user: User[];

  @OneToMany(() => Favorite, (favorite) => favorite.idVideo)
  idFavorite: Favorite[];
}
