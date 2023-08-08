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
import { ContentClassService } from './content_class.service';
import { CreateContentClassDto } from './dto/create-content_class.dto';
import { UpdateContentClassDto } from './dto/update-content_class.dto';
import { RequireRoles } from 'src/auth/require-role.guard';
import { UserRole } from 'src/users/entities/user-role.enum';
import { NotFoundError } from 'rxjs';

@Controller('content-class')
export class ContentClassController {
  constructor(private readonly contentClassService: ContentClassService) {}

  //@RequireRoles(UserRole.ADMIN)
  @Post()
  async create(@Body() createContentClassDto: CreateContentClassDto) {
    try {
      return await this.contentClassService.create(createContentClassDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  //@RequireRoles(UserRole.ADMIN)
  @Get()
  async findAll() {
    try {
      return await this.contentClassService.findAll();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //@RequireRoles(UserRole.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.contentClassService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //@RequireRoles(UserRole.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateContentClassDto: UpdateContentClassDto,
  ) {
    try {
      await this.contentClassService.findOne(id);
      return await this.contentClassService.update(id, updateContentClassDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  //@RequireRoles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.contentClassService.findOne(id);
      return await this.contentClassService.remove(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
