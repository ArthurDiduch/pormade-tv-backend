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
import { RequireAuth } from 'src/auth/strategies/jwt.strategy';
import { UpdatePasswordDto } from './dto/update-passwrod.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
  @RequireAuth()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @HttpCode(200)
  // @RequireAuth()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @HttpCode(200)
  @RequireAuth()
  @Get('img/:id')
  async findImg(@Param('id') id: number) {
    try {
      return await this.usersService.findImg(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //@RequireAuth()
  @Patch('password/:id')
  async updatePassword(
    @Param('id') id: number,
    @Body() updatePassword: UpdatePasswordDto,
  ) {
    try {
      return await this.usersService.updatePassword(id, updatePassword);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @HttpCode(201)
  @RequireAuth()
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @HttpCode(204)
  @RequireAuth()
  @Delete(':id')
  remove(@Param('id') id: number) {
    try {
      return this.usersService.remove(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
