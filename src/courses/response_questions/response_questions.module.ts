import { Module } from '@nestjs/common';
import { ResponseQuestionsService } from './response_questions.service';
import { ResponseQuestionsController } from './response_questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseQuestion } from './entities/response_question.entity';
import { User } from 'src/users/entities/user.entity';
import { Question } from '../questions/entities/question.entity';
import { QuestionsService } from '../questions/questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResponseQuestion, User])],
  controllers: [ResponseQuestionsController],
  providers: [ResponseQuestionsService],
  exports: [ResponseQuestionsService],
})
export class ResponseQuestionsModule {}
