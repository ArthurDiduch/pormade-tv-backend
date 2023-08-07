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
import { NotFoundError } from 'rxjs';

@Injectable()
export class ClasseService {
  constructor(
    @InjectRepository(Classe)
    private readonly classeRepository: Repository<Classe>,
  ) {}

  async create(createClasseDto: CreateClasseDto) {
    try {
      //VEFICAR A ORDEM
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
