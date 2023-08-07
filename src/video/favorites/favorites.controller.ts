import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { RequireRoles } from 'src/auth/require-role.guard';
import { removeFavoriteDTO } from './dto/remove-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @RequireRoles()
  @Post()
  async create(@Body() createFavoriteDto: CreateFavoriteDto) {
    try {
      return await this.favoritesService.create(createFavoriteDto);
    } catch (error) {
      throw new HttpException(error.status, error.response);
    }
  }

  //@RequireRoles()
  @Get(':id')
  async find(@Param('id') id: number) {
    try {
      return await this.favoritesService.find(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //@RequireRoles()
  @Delete(':id')
  remove(
    @Param('id') id: number,
    @Body() removefavoriteDto: removeFavoriteDTO,
  ) {
    try {
      return this.favoritesService.remove(removefavoriteDto);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
