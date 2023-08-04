import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-passwrod.dto';
import { RequireRoles } from 'src/auth/require-role.guard';
import { AchievementsService } from 'src/achievements/achievements/achievements.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly achievementsService: AchievementsService,
  ) {}

  @HttpCode(201)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.create(createUserDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  @HttpCode(200)
  @RequireRoles()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @HttpCode(200)
  @RequireRoles()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @RequireRoles()
  @Patch('password/:id')
  async updatePassword(
    @Param('id') id: number,
    @Body() updatePassword: UpdatePasswordDto,
  ) {
    try {
      return await this.usersService.updatePassword(id, updatePassword);
    } catch (error) {
      throw new UnauthorizedException(error.status);
    }
  }

  @HttpCode(201)
  @RequireRoles()
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.usersService.update(id, updateUserDto);

      if (updateUserDto.lastvideo != null) {
        const verify = await this.achievementsService.verifyAchievements(
          id,
          updatedUser.videosWatched,
        );

        if (verify != false) {
          await this.achievementsService.createUserAchievements(verify);
        }
      }
      return updatedUser;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @HttpCode(204)
  @RequireRoles()
  @Delete(':id')
  remove(@Param('id') id: number) {
    try {
      return this.usersService.remove(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
