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
import { ClasseService } from './classe.service';
import { CreateClasseDto } from './dto/create-classe.dto';
import { UpdateClasseDto } from './dto/update-classe.dto';
import { RequireRoles } from 'src/auth/require-role.guard';
import { UserRole } from 'src/users/entities/user-role.enum';
import { get } from 'http';

@Controller('classe')
export class ClasseController {
  constructor(private readonly classeService: ClasseService) {}

  //@RequireRoles(UserRole.ADMIN)
  @Post()
  async create(@Body() createClasseDto: CreateClasseDto) {
    try {
      return await this.classeService.create(createClasseDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  //@RequireRoles()
  @Get()
  async findAll() {
    try {
      return await this.classeService.findAll();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //@RequireRoles()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.classeService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //@RequireRoles()
  @Get('/module/:id')
  async findModule(@Param('id') id: number) {
    try {
      return await this.classeService.findModule(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //@RequireRoles(UserRole.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateClasseDto: UpdateClasseDto,
  ) {
    try {
      await this.findOne(id);
      return await this.classeService.update(id, updateClasseDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  //@RequireRoles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.classeService.findOne(id);
      return await this.classeService.remove(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
