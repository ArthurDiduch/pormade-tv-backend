import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeOrm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { VideosModule } from './video/videos/videos.module';
import { CategoriesModule } from './achievements/categories/categories.module';
import { FavoritesModule } from './video/favorites/favorites.module';
import { AchievementsModule } from './achievements/achievements/achievements.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
    VideosModule,
    CategoriesModule,
    FavoritesModule,
    AchievementsModule,
  ],
})
export class AppModule {}
