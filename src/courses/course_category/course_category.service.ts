import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseCategoryDto } from './dto/create-course_category.dto';
import { UpdateCourseCategoryDto } from './dto/update-course_category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseCategory } from './entities/course_category.entity';
import { Repository } from 'typeorm';
@Injectable()
export class CourseCategoryService {
  constructor(
    @InjectRepository(CourseCategory)
    private readonly courseCategoryRepository: Repository<CourseCategory>,
  ) {}

  async create(createCourseCategoryDto: CreateCourseCategoryDto) {
    try {
      await this.courseCategoryRepository.save(createCourseCategoryDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  async findAll() {
    try {
      return await this.courseCategoryRepository.find();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.courseCategoryRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateCourseCategoryDto: UpdateCourseCategoryDto) {
    try {
      const updatedCourseCategory = await this.courseCategoryRepository.update(
        id,
        updateCourseCategoryDto,
      );
      if (!updatedCourseCategory) {
        throw new ConflictException();
      }
    } catch (error) {
      throw new ConflictException();
    }
  }

  async remove(id: number) {
    try {
      await this.courseCategoryRepository.findOneOrFail({ where: { id } });
      return await this.courseCategoryRepository.delete({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
