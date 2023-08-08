import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContentClassDto } from './dto/create-content_class.dto';
import { UpdateContentClassDto } from './dto/update-content_class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentClass } from './entities/content_class.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContentClassService {
  constructor(
    @InjectRepository(ContentClass)
    private readonly contentClassRepository: Repository<ContentClass>,
  ) {}

  async create(createContentClassDto: CreateContentClassDto) {
    try {
      const alreadyExists = await this.contentClassRepository.query(
        `SELECT * FROM PUBLIC.content_class WHERE content_class.classe = ${createContentClassDto.classe} and content_class.order = ${createContentClassDto.order}`,
      );

      if (alreadyExists[0] != null) {
        throw new ConflictException();
      }

      await this.contentClassRepository.save(createContentClassDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  async findAll() {
    try {
      await this.contentClassRepository.find();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.contentClassRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateContentClassDto: UpdateContentClassDto) {
    try {
      await this.contentClassRepository.update(id, updateContentClassDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  async remove(id: number) {
    try {
      return await this.contentClassRepository.delete({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
