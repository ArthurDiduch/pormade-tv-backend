import { Module } from '@nestjs/common';
import { ContentClassService } from './content_class.service';
import { ContentClassController } from './content_class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentClass } from './entities/content_class.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentClass, User])],
  controllers: [ContentClassController],
  providers: [ContentClassService],
})
export class ContentClassModule {}
