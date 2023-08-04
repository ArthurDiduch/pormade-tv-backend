import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AchievementsService } from 'src/achievements/achievements.service';
import { Achievement } from 'src/achievements/entities/achievement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Achievement])],
  controllers: [UsersController],
  providers: [UsersService, AchievementsService],
  exports: [UsersService],
})
export class UsersModule {}
