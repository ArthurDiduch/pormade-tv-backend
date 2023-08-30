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
} from '@nestjs/common';
import { ResponseQuestionsService } from './response_questions.service';
import { CreateResponseQuestionDto } from './dto/create-response_question.dto';
import { UpdateResponseQuestionDto } from './dto/update-response_question.dto';
import { RequireRoles } from 'src/auth/require-role.guard';
import { UserRole } from 'src/users/entities/user-role.enum';

@Controller('response-questions')
export class ResponseQuestionsController {
  constructor(
    private readonly responseQuestionsService: ResponseQuestionsService,
  ) {}

  //@RequireRoles(UserRole.ADMIN)
  @Post()
  async create(@Body() createResponseQuestionDto: CreateResponseQuestionDto) {
    try {
      await this.responseQuestionsService.create(createResponseQuestionDto);
    } catch (error) {
      throw new ConflictException();
    }
  }

  //@RequireRoles()
  @Get()
  async findAll() {
    try {
      return await this.responseQuestionsService.findAll();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //@RequireRoles()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.responseQuestionsService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //@RequireRoles(UserRole.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateResponseQuestionDto: UpdateResponseQuestionDto,
  ) {
    try {
      await this.responseQuestionsService.findOne(id);
      return await this.responseQuestionsService.update(
        id,
        updateResponseQuestionDto,
      );
    } catch (error) {
      throw new ConflictException();
    }
  }

  //@RequireRoles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.responseQuestionsService.findOne(id);
      return await this.responseQuestionsService.remove(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
