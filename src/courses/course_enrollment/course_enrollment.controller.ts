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
import { CourseEnrollmentService } from './course_enrollment.service';
import { CreateCourseEnrollmentDto } from './dto/create-course_enrollment.dto';
import { UpdateCourseEnrollmentDto } from './dto/update-course_enrollment.dto';
import { RequireAuth } from 'src/auth/strategies/jwt.strategy';
import { RequireRoles } from 'src/auth/require-role.guard';
import { UserRole } from 'src/users/entities/user-role.enum';

@Controller('course-enrollment')
export class CourseEnrollmentController {
  constructor(
    private readonly courseEnrollmentService: CourseEnrollmentService,
  ) {}

  //@RequireRoles(UserRole.ADMIN)
  @Post()
  async create(@Body() createCourseEnrollmentDto: CreateCourseEnrollmentDto) {
    try {
      return await this.courseEnrollmentService.create(
        createCourseEnrollmentDto,
      );
    } catch (error) {
      throw new ConflictException();
    }
  }

  //@RequireRoles(UserRole.ADMIN)
  @Get()
  async findAll() {
    try {
      return await this.courseEnrollmentService.findAll();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //@RequireRoles(UserRole.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.courseEnrollmentService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //@RequireRoles(UserRole.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCourseEnrollmentDto: UpdateCourseEnrollmentDto,
  ) {
    try {
      await this.courseEnrollmentService.findOne(id);

      return await this.courseEnrollmentService.update(
        id,
        updateCourseEnrollmentDto,
      );
    } catch (error) {
      throw new ConflictException();
    }
  }

  //@RequireRoles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.courseEnrollmentService.findOne(id);
      return await this.courseEnrollmentService.remove(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
