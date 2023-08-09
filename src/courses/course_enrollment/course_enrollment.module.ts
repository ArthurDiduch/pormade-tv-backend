import { Module } from '@nestjs/common';
import { CourseEnrollmentService } from './course_enrollment.service';
import { CourseEnrollmentController } from './course_enrollment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEnrollment } from './entities/course_enrollment.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEnrollment, User])],
  controllers: [CourseEnrollmentController],
  providers: [CourseEnrollmentService],
})
export class CourseEnrollmentModule {}
