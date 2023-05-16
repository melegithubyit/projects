"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentlyAddedService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RecentlyAddedService = class RecentlyAddedService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createMovie(dto) {
        const movie = await this.prisma.recentlyAdded.create({
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
        const movies = await this.prisma.recentlyAdded.findMany();
        return movies;
    }
    async getMovie(id) {
        const movie = await this.prisma.recentlyAdded.findFirst({
            where: {
                id: id,
            },
        });
        return movie;
    }
    async updateMovie(id, dto) {
        const movie = await this.prisma.recentlyAdded.update({
            where: {
                id: id,
            },
            data: {
                imdbRating: dto.imdbRating,
            },
        });
        return movie;
    }
    async deleteMovie(id) {
        const movie = await this.prisma.recentlyAdded.delete({
            where: {
                id: id,
            },
        });
        return movie;
    }
};
RecentlyAddedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RecentlyAddedService);
exports.RecentlyAddedService = RecentlyAddedService;
//# sourceMappingURL=recently-added.service.js.map