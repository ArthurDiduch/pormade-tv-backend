import { Module } from '@nestjs/common';
import { CourseModuleService } from './course_module.service';
import { CourseModuleController } from './course_module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './entities/course_module.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseModule, User])],
  controllers: [CourseModuleController],
  providers: [CourseModuleService],
})
export class CourseModuleModule {}
