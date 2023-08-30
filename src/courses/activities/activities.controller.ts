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
  HttpException,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { QuestionsService } from '../questions/questions.service';
import { RequireRoles } from 'src/auth/require-role.guard';
import { UserRole } from 'src/users/entities/user-role.enum';
import { NotFoundError } from 'rxjs';
import { CreateQuestionDto } from '../questions/dto/create-question.dto';
import { ResponseQuestionsService } from '../response_questions/response_questions.service';
import { ResponseQuestion } from '../response_questions/entities/response_question.entity';
import { CreateResponseQuestionDto } from '../response_questions/dto/create-response_question.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(
    private readonly activitiesService: ActivitiesService,
    private readonly questionService: QuestionsService,
    private readonly responseService: ResponseQuestionsService,
  ) {}

  //@RequireRoles(UserRole.ADMIN)
  @Post()
  async create(@Body() createActivityDto) {
    try {
      const activity = new CreateActivityDto();

      activity.name = createActivityDto.name;
      activity.description = createActivityDto.description;
      activity.contentClass = createActivityDto.contentClass;

      const activityId = await this.activitiesService.create(activity);

      const question = new CreateQuestionDto();
      question.question = createActivityDto.test.question;
      question.activity = activityId;

      const questionId = await this.questionService.create(question);

      const responseQuestion = new CreateResponseQuestionDto();

      for (let i = 0; i < createActivityDto.test.responses.length; i++) {
        responseQuestion.response =
          createActivityDto.test.responses[i].response;
        responseQuestion.question = questionId;
        responseQuestion.status =
          createActivityDto.test.responses[i].status.status;

        await this.responseService.create(responseQuestion);
      }
    } catch (error) {
      throw new ConflictException();
    }
  }

  //@RequireRoles()
  @Get()
  async findAll() {
    try {
      return await this.activitiesService.findAll();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //@RequireRoles()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return this.activitiesService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //@RequireRoles(UserRole.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    try {
      await this.activitiesService.findOne(id);
      return this.activitiesService.update(id, updateActivityDto);
    } catch (error) {
      throw new HttpException(error.status, error.response);
    }
  }

  //@RequireRoles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.activitiesService.findOne(id);
      return await this.activitiesService.remove(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
