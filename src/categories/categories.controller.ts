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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { RequireRoles } from 'src/auth/require-role.guard';
import { UserRole } from 'src/users/entities/user-role.enum';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @RequireRoles(UserRole.ADMIN)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return this.categoriesService.create(createCategoryDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  @RequireRoles()
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }
  @RequireRoles()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.categoriesService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
  @RequireRoles()
  @Post('/busca')
  async findByName(@Body('category') category: number) {
    try {
      const categoryId = await this.categoriesService.findByName(category);
      return categoryId;
    } catch (error) {
      throw new NotFoundException();
    }
  }
  @RequireRoles(UserRole.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      return await this.categoriesService.update(id, updateCategoryDto);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @RequireRoles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
