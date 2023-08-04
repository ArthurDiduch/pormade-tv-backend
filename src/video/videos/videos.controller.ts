import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { RequireRoles } from 'src/auth/require-role.guard';
import { UserRole } from 'src/users/entities/user-role.enum';
import { CategoriesService } from 'src/achievements/categories/categories.service';
import { CreateCategoryDto } from 'src/achievements/categories/dto/create-category.dto';

@Controller('videos')
export class VideosController {
  constructor(
    private readonly videosService: VideosService,
    private readonly categoryService: CategoriesService,
  ) {}

  @RequireRoles(UserRole.ADMIN)
  @Post()
  async create(@Body() createVideoDto: CreateVideoDto) {
    try {
      if (Object.keys(createVideoDto.category).length === 0) {
        delete createVideoDto.category;
        return await this.videosService.create(createVideoDto);
      } else {
        const categoryId = await this.categoryService.findByName(
          createVideoDto.category,
        );
        if (categoryId == false) {
          const name = createVideoDto.category.toString();
          const createCategoryDto: CreateCategoryDto = { name };

          const newCategory = await this.categoryService.create(
            createCategoryDto,
          );

          createVideoDto.category = newCategory;
          return await this.videosService.create(createVideoDto);
        }
        createVideoDto.category = categoryId;

        return await this.videosService.create(createVideoDto);
      }
    } catch (error) {
      throw new ConflictException();
    }
  }

  @RequireRoles()
  @Get()
  findAll() {
    return this.videosService.findAll();
  }

  @RequireRoles()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.videosService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
  @RequireRoles()
  @Get('category/:category')
  async findByCategory(@Param('category') category: number) {
    try {
      return await this.videosService.findByCategory(category);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @RequireRoles()
  @Post('/busca')
  async findByTitle(@Body('title') title: string) {
    try {
      const video = await this.videosService.findByTitle(title);
      return video;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @RequireRoles(UserRole.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateVideoDto: UpdateVideoDto,
  ) {
    try {
      if (Object.keys(updateVideoDto.category).length === 0) {
        delete updateVideoDto.category;
        return await this.videosService.update(id, updateVideoDto);
      } else {
        const categoryId = await this.categoryService.findByName(
          updateVideoDto.category,
        );
        if (categoryId == false) {
          const name = updateVideoDto.category.toString();
          const createCategoryDto: CreateCategoryDto = { name };

          const newCategory = await this.categoryService.create(
            createCategoryDto,
          );

          updateVideoDto.category = newCategory;
          return await this.videosService.update(id, updateVideoDto);
        }
        updateVideoDto.category = categoryId;

        return await this.videosService.update(id, updateVideoDto);
      }
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @RequireRoles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    try {
      return this.videosService.remove(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
