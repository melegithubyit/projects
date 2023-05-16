import { UpdateMovieDto } from 'src/movie/dto/updateMovie.dto';
import { MovieDto } from '../movie/dto/movie.dto';
import { RecentlyAddedService } from './recently-added.service';
export declare class RecentlyAddedController {
    private recentService;
    constructor(recentService: RecentlyAddedService);
    createMovie(dto: MovieDto): Promise<import(".prisma/client").recentlyAdded>;
    getMovies(): Promise<import(".prisma/client").recentlyAdded[]>;
    getMovie(id: any): Promise<import(".prisma/client").recentlyAdded>;
    updateMovie(dto: UpdateMovieDto, id: any): Promise<import(".prisma/client").recentlyAdded>;
    deleteMovie(id: any): Promise<import(".prisma/client").recentlyAdded>;
}
