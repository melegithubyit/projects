import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { MovieDto } from './dto';
import { UpdateMovieDto } from './dto/updateMovie.dto';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}
  @Post()
  createMovie(@Body() dto: MovieDto) {
    return this.movieService.createMovie(dto);
  }

  @Get()
  getMovies() {
    return this.movieService.getMovies();
  }

  @Get(':id')
  getMovie(@Body('id', ParseIntPipe) id: number) {
    return this.movieService.getMovie(id);
  }

  @Put(':id')
  updateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMovieDto,
  ) {
    return this.movieService.updateMovie(id, dto);
  }

  @Delete(':id')
  deleteMovie(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.deleteMovie(id);
  }
}
