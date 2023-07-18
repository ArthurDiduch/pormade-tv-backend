import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryRepository.save(createCategoryDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const updatedCategory = await this.categoryRepository.update(
        id,
        updateCategoryDto,
      );
      if (!updatedCategory) {
        throw new ConflictException();
      }
      return this.categoryRepository.find({ where: { id: id } });
    } catch (error) {
      throw new ConflictException();
    }
  }

  async remove(id: number) {
    try {
      const deletedCategory = await this.categoryRepository.findOneOrFail({
        where: { id: id },
      });
      if (!deletedCategory) {
        throw new ConflictException();
      }
      this.categoryRepository.delete({ id: id });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
