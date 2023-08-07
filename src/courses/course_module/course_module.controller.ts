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
import { CourseModuleService } from './course_module.service';
import { CreateCourseModuleDto } from './dto/create-course_module.dto';
import { UpdateCourseModuleDto } from './dto/update-course_module.dto';
import { RequireRoles } from 'src/auth/require-role.guard';
import { UserRole } from 'src/users/entities/user-role.enum';

@Controller('course-module')
export class CourseModuleController {
  constructor(private readonly courseModuleService: CourseModuleService) {}

  @RequireRoles(UserRole.ADMIN)
  @Post()
  async create(@Body() createCourseModuleDto: CreateCourseModuleDto) {
    try {
      return await this.courseModuleService.create(createCourseModuleDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  @RequireRoles()
  @Get()
  async findAll() {
    try {
      return await this.courseModuleService.findAll();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @RequireRoles()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.courseModuleService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @RequireRoles(UserRole.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCourseModuleDto: UpdateCourseModuleDto,
  ) {
    try {
      await this.courseModuleService.findOne(id);
      return await this.courseModuleService.update(id, updateCourseModuleDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  @RequireRoles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.courseModuleService.findOne(id);
      return await this.courseModuleService.remove(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
