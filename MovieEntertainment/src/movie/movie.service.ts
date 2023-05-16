import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { MovieDto } from './dto';
import { UpdateMovieDto } from './dto/updateMovie.dto';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  async createMovie(dto: MovieDto) {
    const movie = await this.prisma.movie.create({
      data: {
        title: dto.title,
        imdbPoster: dto.imdbPoster,
        filePath: dto.filePath,
        description: dto.description,
        imdbRating: dto.imdbRating,
        releaseDate: dto.releaseDate,
      },
    });
    return movie;
  }
  async getMovies() {
    const movie = await this.prisma.movie.findMany();
    return movie;
  }
  async getMovie(id: number) {
    const movie = await this.prisma.movie.findFirst({
      where: {
        id: id,
      },
    });
    return movie;
  }
  async updateMovie(id: number, dto: UpdateMovieDto) {
    try {
      const movie = await this.prisma.movie.update({
        where: { id: id },
        data: {
          imdbRating: dto.imdbRating,
        },
      });
      return movie;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Movie Not Found.');
      } else throw error;
    }
  }
  async deleteMovie(id: number) {
    const movie = await this.prisma.movie.delete({
      where: {
        id: id,
      },
    });
    return movie;
  }
}
