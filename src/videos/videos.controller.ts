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
  Query,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    try {
      return this.videosService.create(createVideoDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  @Get()
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.videosService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post('/busca')
  async findByTitle(@Body('title') title: string) {
    try {
      const video = await this.videosService.findByTitle(title);
      return video;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateVideoDto: UpdateVideoDto) {
    try {
      return this.videosService.update(id, updateVideoDto);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    try {
      return this.videosService.remove(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
