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
import { CourseCategoryService } from './course_category.service';
import { CreateCourseCategoryDto } from './dto/create-course_category.dto';
import { UpdateCourseCategoryDto } from './dto/update-course_category.dto';
import { RequireRoles } from 'src/auth/require-role.guard';
import { UserRole } from 'src/users/entities/user-role.enum';

@Controller('course-category')
export class CourseCategoryController {
  constructor(private readonly courseCategoryService: CourseCategoryService) {}

  @RequireRoles(UserRole.ADMIN)
  @Post()
  async create(@Body() createCourseCategoryDto: CreateCourseCategoryDto) {
    try {
      return await this.courseCategoryService.create(createCourseCategoryDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  @RequireRoles()
  @Get()
  async findAll() {
    try {
      return await this.courseCategoryService.findAll();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @RequireRoles()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.courseCategoryService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @RequireRoles(UserRole.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCourseCategoryDto: UpdateCourseCategoryDto,
  ) {
    try {
      await this.courseCategoryService.findOne(id);
      await this.courseCategoryService.update(id, updateCourseCategoryDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  @RequireRoles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    try {
      return this.courseCategoryService.remove(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
