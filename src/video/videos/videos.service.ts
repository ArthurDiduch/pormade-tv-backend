import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateVideoDto } from "./dto/create-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { Video } from "./entities/video.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>
  ) {}

  async create(createVideoDto: CreateVideoDto) {
    try {
      return await this.videoRepository.save(createVideoDto);
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

  async findByCategory(category: number) {
    try {
      return await this.videoRepository.find({
        where: { category },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findByTitle(title: string) {
    try {
      const video = await this.videoRepository.query(
        `SELECT * FROM PUBLIC.video WHERE title='${title}'`
      );
      if (!video) {
        throw new NotFoundException();
      }
      return video;
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async update(id: number, updateVideoDto: UpdateVideoDto) {
    try {
      const findVideo = this.videoRepository.find({ where: { id: id } });

      if (!findVideo) throw new NotFoundException();

      const updatedVideo = await this.videoRepository.update(
        id,
        updateVideoDto
      );

      return findVideo;
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
      this.videoRepository.delete({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
