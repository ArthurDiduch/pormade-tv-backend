import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  async create(createVideoDto: CreateVideoDto) {
    try {
      createVideoDto.image = createVideoDto.image + `][`;
      const newVideo = await this.videoRepository.save(createVideoDto);
      return newVideo;
    } catch (error) {
      console.error(error);
      throw new ConflictException();
    }
  }

  async findAll() {
    return await this.videoRepository.find();
  }

  async findOne(id: number) {
    const video = await this.videoRepository.findOneOrFail({
      where: { id: id },
    });
    return video;
  }

  async findByTitle(title: string) {
    try {
      const video = await this.videoRepository.query(
        `SELECT * FROM public.video where title='${title}'`,
      );
      return video;
    } catch (error) {}
  }

  async update(id: number, updateVideoDto: UpdateVideoDto) {
    try {
      const updatedVideo = await this.videoRepository.update(
        id,
        updateVideoDto,
      );
      if (!updatedVideo) {
        throw new ConflictException();
      }
      return this.videoRepository.find({ where: { id: id } });
    } catch (error) {
      throw new HttpException(error.status, error.message);
    }
  }

  async remove(id: number) {
    try {
      const deletedVideo = await this.videoRepository.findOneOrFail({
        where: { id: id },
      });
      if (!deletedVideo) {
        throw new ConflictException();
      }
      this.videoRepository.delete({ id: id });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
