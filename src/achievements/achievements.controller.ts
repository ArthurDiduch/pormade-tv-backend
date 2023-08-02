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
import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { NotFoundError } from 'rxjs';

@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Post()
  async create(@Body() createAchievementDto: CreateAchievementDto) {
    try {
      return await this.achievementsService.create(createAchievementDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.achievementsService.findAll();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.achievementsService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAchievementDto: UpdateAchievementDto,
  ) {
    try {
      return await this.achievementsService.update(id, updateAchievementDto);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    try {
      return this.achievementsService.remove(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
