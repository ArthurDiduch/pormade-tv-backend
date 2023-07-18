import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVideoDto {
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
  video_id: string;

  @IsNotEmpty()
  category: number;
}
