import { PartialType } from '@nestjs/mapped-types';
import { CreateVideoDto } from './create-video.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {
  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  link: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  lauch: string;

  @IsNotEmpty()
  @IsString()
  videoId: string;
}
