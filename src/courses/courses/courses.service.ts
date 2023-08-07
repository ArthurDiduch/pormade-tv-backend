import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    try {
      return await this.courseRepository.save(createCourseDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  async findAll() {
    try {
      return await this.courseRepository.find();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.courseRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new ConflictException();
    }
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    try {
      const updatedCourse = await this.courseRepository.update(
        id,
        updateCourseDto,
      );
      if (!updatedCourse) {
        throw new ConflictException();
      }
    } catch (error) {
      throw new ConflictException();
    }
  }

  remove(id: number) {
    try {
      this.courseRepository.delete({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
