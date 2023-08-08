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
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { RequireRoles } from 'src/auth/require-role.guard';
import { UserRole } from 'src/users/entities/user-role.enum';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  //@RequireRoles(UserRole.ADMIN)
  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    try {
      return await this.questionsService.create(createQuestionDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  //@RequireRoles(UserRole.ADMIN)
  @Get()
  async findAll() {
    try {
      return await this.questionsService.findAll();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //@RequireRoles(UserRole.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.questionsService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //@RequireRoles(UserRole.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    try {
      await this.questionsService.findOne(id);
      return await this.questionsService.update(id, updateQuestionDto);
    } catch (error) {
      throw new HttpException(error.status, error.response);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.questionsService.findOne(id);
      return await this.questionsService.remove(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
