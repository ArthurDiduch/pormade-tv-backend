import { Module } from '@nestjs/common';
import { ClasseService } from './classe.service';
import { ClasseController } from './classe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classe } from './entities/classe.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Classe, User])],
  controllers: [ClasseController],
  providers: [ClasseService],
})
export class ClasseModule {}
