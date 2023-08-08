import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeOrm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { VideosModule } from './video/videos/videos.module';
import { CategoriesModule } from './video/categories/categories.module';
import { FavoritesModule } from './video/favorites/favorites.module';
import { AchievementsModule } from './achievements/achievements/achievements.module';
import { CourseCategoryModule } from './courses/course_category/course_category.module';
import { CoursesModule } from './courses/courses/courses.module';
import { CourseModuleModule } from './courses/course_module/course_module.module';
import { ClasseModule } from './courses/classe/classe.module';
import { ContentClassModule } from './courses/content_class/content_class.module';
import { ActivitiesModule } from './courses/activities/activities.module';
import { QuestionsModule } from './courses/questions/questions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
    VideosModule,
    CategoriesModule,
    FavoritesModule,
    AchievementsModule,
    CourseCategoryModule,
    CoursesModule,
    CourseModuleModule,
    ClasseModule,
    ContentClassModule,
    ActivitiesModule,
    QuestionsModule,
  ],
})
export class AppModule {}
