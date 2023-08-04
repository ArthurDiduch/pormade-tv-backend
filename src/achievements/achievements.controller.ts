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
import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { RequireRoles } from 'src/auth/require-role.guard';
import { UserRole } from 'src/users/entities/user-role.enum';

@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  // @RequireRoles(UserRole.ADMIN)
  @Post()
  async create(@Body() createAchievementDto: CreateAchievementDto) {
    try {
      return await this.achievementsService.create(createAchievementDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  // @RequireRoles(UserRole.ADMIN)
  @Get()
  async findAll() {
    try {
      return await this.achievementsService.findAll();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  // @RequireRoles(UserRole.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.achievementsService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  // @RequireRoles(UserRole.ADMIN)
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

  // @RequireRoles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    try {
      return this.achievementsService.remove(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
