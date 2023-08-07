import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { User } from 'src/users/entities/user.entity';
import { CategoriesService } from 'src/video/categories/categories.service';
import { Category } from 'src/video/categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video, User, Category])],
  controllers: [VideosController],
  providers: [VideosService, CategoriesService],
  exports: [VideosService],
})
export class VideosModule {}
