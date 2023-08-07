import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Console } from 'console';
import { create } from 'domain';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto) {
    try {
      const user = await this.favoriteRepository.query(
        `SELECT * FROM PUBLIC.user WHERE id=${createFavoriteDto.user}`,
      );
      const video = await this.favoriteRepository.query(
        `SELECT * FROM PUBLIC.video WHERE id=${createFavoriteDto.video}`,
      );

      const verify = await this.favoriteRepository
        .query(`SELECT us.id, us.name,vd.image, vd.title, vd.video_id
      FROM favorite fv 
      INNER JOIN PUBLIC.user as us on fv.user = us.id
      INNER JOIN video vd on fv.video = vd.id where us.id= ${createFavoriteDto.user} and vd.id = ${createFavoriteDto.video}`);

      if (Object.keys(user).length === 0 || Object.keys(video).length === 0) {
        throw new NotFoundException();
      } else if (Object.keys(verify).length === 1) {
        throw new ConflictException();
      } else {
        return this.favoriteRepository.save(createFavoriteDto);
      }
    } catch (error) {
      throw new HttpException(error.status, error.response);
    }
  }

  async find(id: number) {
    try {
      const favorites = await this.favoriteRepository
        .query(`SELECT fv.id, us.name,vd.image, vd.title, vd.video_id
      FROM favorite fv 
      INNER JOIN PUBLIC.user as us on fv.user = us.id
      INNER JOIN video vd on fv.video = vd.id where us.id = ${id}
      `);
      if (favorites[0].lenght == 0) {
        throw new NotFoundException();
      }

      return favorites;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async remove(removefavoriteDto) {
    try {
      const deletedFavorite = await this.favoriteRepository.query(
        `SELECT fv.id FROM public.favorite fv INNER JOIN public.user us on us.id = fv.user where fv.user = ${removefavoriteDto.idUser} and fv.video= ${removefavoriteDto.idVideo};`,
      );
      const id = deletedFavorite[0].id;

      await this.favoriteRepository.delete({
        id: id,
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
