import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "./entities/question.entity";
import { Repository } from "typeorm";

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    try {
      const question = await this.questionRepository.save(createQuestionDto);
      return question.id;
    } catch (error) {
      throw new ConflictException();
    }
  }

  async findAll() {
    try {
      return await this.questionRepository.find();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number) {
    try {
      const question = await this.questionRepository.findOneOrFail({
        where: { id },
      });
      const responseQuestion = await this.questionRepository.query(
        `SELECT * FROM PUBLIC."response_question" WHERE "response_question"."question" = ${id}`
      );
      const questionResponses = {
        question,
        response: responseQuestion,
      };
      return questionResponses;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    try {
      await this.questionRepository.update(id, updateQuestionDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  async remove(id: number) {
    try {
      return await this.questionRepository.delete({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
