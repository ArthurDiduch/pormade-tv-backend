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
  HttpException,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { RequireRoles } from 'src/auth/require-role.guard';
import { UserRole } from 'src/users/entities/user-role.enum';
import { NotFoundError } from 'rxjs';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  //@RequireRoles(UserRole.ADMIN)
  @Post()
  async create(@Body() createActivityDto: CreateActivityDto) {
    try {
      return await this.activitiesService.create(createActivityDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  //@RequireRoles()
  @Get()
  async findAll() {
    try {
      return await this.activitiesService.findAll();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //@RequireRoles()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return this.activitiesService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //@RequireRoles(UserRole.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    try {
      await this.activitiesService.findOne(id);
      return this.activitiesService.update(id, updateActivityDto);
    } catch (error) {
      throw new HttpException(error.status, error.response);
    }
  }

  //@RequireRoles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.activitiesService.findOne(id);
      return await this.activitiesService.remove(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
