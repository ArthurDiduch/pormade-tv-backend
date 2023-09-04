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
import { Question } from '../questions/entities/question.entity';
import { ResponseQuestionsModule } from '../response_questions/response_questions.module';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async create(createActivityDto: CreateActivityDto) {
    try {
      const activity = await this.activityRepository.save(createActivityDto);

      return activity.id;
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
  async findAllQuestions(id: number) {
    try {
      const questions = await this.questionRepository.query(
        `SELECT * FROM PUBLIC."question" WHERE "question"."activity" = ${id}`,
      );
      questions.map((question) => delete question.idResponseQuestionId);

      const responses = await this.activityRepository
        .query(`SELECT rq.id, rq.response, rq.status, rq.question FROM public."activity" ac INNER JOIN public."question" q ON
        ac.id=q.activity INNER JOIN public."response_question" rq ON
        q.id= rq.question WHERE ac.id = ${id}`);

      questions.forEach((question) => {
        const responsesArray = [];

        responses.forEach((response) => {
          if (question.id == response.question) {
            responsesArray.push({
              id: response.id,
              response: response.response,
              status: response.status,
              question: response.question,
            });
          }
          Object.assign(question, { responsesArray });
        });
      });
      console.log(questions);
      return questions;
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
