import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClasseDto } from './dto/create-classe.dto';
import { UpdateClasseDto } from './dto/update-classe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Classe } from './entities/classe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClasseService {
  constructor(
    @InjectRepository(Classe)
    private readonly classeRepository: Repository<Classe>,
  ) {}

  async create(createClasseDto: CreateClasseDto) {
    try {
      const alreadyExists = await this.classeRepository.query(
        `SELECT * FROM PUBLIC.classe WHERE classe.module = ${createClasseDto.module} and classe.order = ${createClasseDto.order}`,
      );

      if (alreadyExists[0] != null) {
        throw new ConflictException();
      }
      return await this.classeRepository.save(createClasseDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  async findAll() {
    try {
      return await this.classeRepository.find();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.classeRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateClasseDto: UpdateClasseDto) {
    try {
      const alreadyExists = await this.classeRepository.query(
        `SELECT * FROM PUBLIC.classe WHERE classe.module = ${updateClasseDto.module} and classe.order = ${updateClasseDto.order}`,
      );

      if (alreadyExists[0] != null) {
        throw new ConflictException();
      }
      return this.classeRepository.update(id, updateClasseDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  remove(id: number) {
    try {
      return this.classeRepository.delete({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
