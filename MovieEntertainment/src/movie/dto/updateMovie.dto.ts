import { IsNotEmpty, IsString, Min, Max, IsNumber } from 'class-validator';
export class UpdateMovieDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(10)
  imdbRating: number;
}
