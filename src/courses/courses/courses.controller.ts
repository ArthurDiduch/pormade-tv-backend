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
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { RequireRoles } from 'src/auth/require-role.guard';
import { UserRole } from 'src/users/entities/user-role.enum';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // @RequireRoles(UserRole.ADMIN)
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    try {
      return await this.coursesService.create(createCourseDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  //@RequireRoles()
  @Get()
  async findAll() {
    try {
      return await this.coursesService.findAll();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @RequireRoles()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.coursesService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
  @Get('/module/:id')
  async findModule(@Param('id') id: number) {
    try {
      return await this.coursesService.findModule(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @RequireRoles(UserRole.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    try {
      await this.coursesService.findOne(id);
      return await this.coursesService.update(id, updateCourseDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  @RequireRoles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.coursesService.findOne(id);
      return await this.coursesService.remove(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
