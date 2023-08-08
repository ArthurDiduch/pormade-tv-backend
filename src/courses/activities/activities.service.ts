import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async create(createActivityDto: CreateActivityDto) {
    try {
      await this.activityRepository.save(createActivityDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  async findAll() {
    try {
      return await this.activityRepository.find();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.activityRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    try {
      await this.activityRepository.update(id, updateActivityDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  async remove(id: number) {
    try {
      return await this.activityRepository.delete({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
