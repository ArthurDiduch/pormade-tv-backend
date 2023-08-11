import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseModuleDto } from './dto/create-course_module.dto';
import { UpdateCourseModuleDto } from './dto/update-course_module.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseModule } from './entities/course_module.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseModuleService {
  constructor(
    @InjectRepository(CourseModule)
    private readonly courseModuloRepository: Repository<CourseModule>,
  ) {}

  async create(createCourseModuleDto: CreateCourseModuleDto) {
    try {
      const alreadyExists = await this.courseModuloRepository.query(
        `SELECT * FROM PUBLIC.course_module where PUBLIC.course_module.course = ${createCourseModuleDto.course} and PUBLIC.course_module.order = ${createCourseModuleDto.order}`,
      );
      if (alreadyExists[0] != null) {
        throw new ConflictException();
      }

      return this.courseModuloRepository.save(createCourseModuleDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  async findAll() {
    try {
      return await this.courseModuloRepository.find();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.courseModuloRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateCourseModuleDto: UpdateCourseModuleDto) {
    try {
      const alreadyExists = await this.courseModuloRepository.query(
        `SELECT * FROM PUBLIC.course_module where PUBLIC.course_module.course = ${updateCourseModuleDto.course} and PUBLIC.course_module.order = ${updateCourseModuleDto.order}`,
      );

      if (alreadyExists[0] != null) {
        throw new ConflictException();
      }
      await this.courseModuloRepository.update(id, updateCourseModuleDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  remove(id: number) {
    try {
      return this.courseModuloRepository.delete({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
