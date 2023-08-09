import { Module } from '@nestjs/common';
import { ResponseQuestionsService } from './response_questions.service';
import { ResponseQuestionsController } from './response_questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseQuestion } from './entities/response_question.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResponseQuestion, User])],
  controllers: [ResponseQuestionsController],
  providers: [ResponseQuestionsService],
})
export class ResponseQuestionsModule {}
