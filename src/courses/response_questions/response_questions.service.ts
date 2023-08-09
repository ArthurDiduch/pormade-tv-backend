import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateResponseQuestionDto } from './dto/create-response_question.dto';
import { UpdateResponseQuestionDto } from './dto/update-response_question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseQuestion } from './entities/response_question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResponseQuestionsService {
  constructor(
    @InjectRepository(ResponseQuestion)
    private readonly responseQuestionRepository: Repository<ResponseQuestion>,
  ) {}

  async create(createResponseQuestionDto: CreateResponseQuestionDto) {
    try {
      await this.responseQuestionRepository.save(createResponseQuestionDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  async findAll() {
    try {
      return await this.responseQuestionRepository.find();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.responseQuestionRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(
    id: number,
    updateResponseQuestionDto: UpdateResponseQuestionDto,
  ) {
    try {
      await this.responseQuestionRepository.update(
        id,
        updateResponseQuestionDto,
      );
    } catch (error) {
      throw new ConflictException();
    }
  }

  async remove(id: number) {
    try {
      return await this.responseQuestionRepository.delete({ id });
    } catch (error) {
      throw new ConflictException();
    }
  }
}
