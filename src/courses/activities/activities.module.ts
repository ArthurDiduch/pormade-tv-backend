import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { User } from 'src/users/entities/user.entity';
import { Question } from '../questions/entities/question.entity';
import { QuestionsService } from '../questions/questions.service';
import { ResponseQuestion } from '../response_questions/entities/response_question.entity';
import { ResponseQuestionsService } from '../response_questions/response_questions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity, User, Question, ResponseQuestion]),
  ],
  controllers: [ActivitiesController],
  providers: [ActivitiesService, QuestionsService, ResponseQuestionsService],
})
export class ActivitiesModule {}
