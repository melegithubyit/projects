import { IsEmail } from 'class-validator';
import { IsNotEmpty, IsString, Min, Max, IsNumber } from 'class-validator';
import { isFloat32Array } from 'util/types';

export class MovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  imdbPoster: string;

  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(10)
  imdbRating: number;

  @IsString()
  @IsNotEmpty()
  filePath: string;

  @IsString()
  @IsNotEmpty()
  releaseDate: string;
}
