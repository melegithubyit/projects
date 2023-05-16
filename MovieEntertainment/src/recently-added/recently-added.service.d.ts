import { PrismaService } from 'src/prisma/prisma.service';
import { MovieDto } from 'src/movie/dto';
import { UpdateMovieDto } from 'src/movie/dto/updateMovie.dto';
export declare class RecentlyAddedService {
    private prisma;
    constructor(prisma: PrismaService);
    createMovie(dto: MovieDto): Promise<import(".prisma/client").recentlyAdded>;
    getMovies(): Promise<import(".prisma/client").recentlyAdded[]>;
    getMovie(id: number): Promise<import(".prisma/client").recentlyAdded>;
    updateMovie(id: number, dto: UpdateMovieDto): Promise<import(".prisma/client").recentlyAdded>;
    deleteMovie(id: number): Promise<import(".prisma/client").recentlyAdded>;
}
