import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Achievement } from './entities/achievement.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
  ) {}

  async create(createAchievementDto: CreateAchievementDto) {
    try {
      return await this.achievementRepository.save(createAchievementDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  async findAll() {
    try {
      return await this.achievementRepository.find();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.achievementRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateAchievementDto: UpdateAchievementDto) {
    try {
      const updatedAchievement = await this.achievementRepository.update(
        id,
        updateAchievementDto,
      );
      if (!updatedAchievement) {
        throw new ConflictException();
      }
      return await this.achievementRepository.find({ where: { id } });
    } catch (error) {
      throw new ConflictException();
    }
  }

  async remove(id: number) {
    try {
      await this.achievementRepository.findOneOrFail({ where: { id: id } });
      this.achievementRepository.delete({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
