import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseEnrollmentDto } from './dto/create-course_enrollment.dto';
import { UpdateCourseEnrollmentDto } from './dto/update-course_enrollment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEnrollment } from './entities/course_enrollment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseEnrollmentService {
  constructor(
    @InjectRepository(CourseEnrollment)
    private readonly courseEnrollmentRepository: Repository<CourseEnrollment>,
  ) {}

  async create(createCourseEnrollmentDto: CreateCourseEnrollmentDto) {
    try {
      const verify = await this.courseEnrollmentRepository.query(
        `SELECT * FROM public.course_enrollment where course_enrollment.user = ${createCourseEnrollmentDto.user} and course_enrollment.course = ${createCourseEnrollmentDto.course}`,
      );

      if (verify[0] != null) {
        throw new ConflictException();
      }

      await this.courseEnrollmentRepository.save(createCourseEnrollmentDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  async findAll() {
    try {
      return await this.courseEnrollmentRepository.find();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.courseEnrollmentRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(
    id: number,
    updateCourseEnrollmentDto: UpdateCourseEnrollmentDto,
  ) {
    try {
      await this.courseEnrollmentRepository.update(
        id,
        updateCourseEnrollmentDto,
      );
    } catch (error) {
      throw new ConflictException();
    }
  }

  async remove(id: number) {
    try {
      return await this.courseEnrollmentRepository.delete({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
