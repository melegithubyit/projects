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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentlyAddedController = void 0;
const common_1 = require("@nestjs/common");
const pipes_1 = require("@nestjs/common/pipes");
const updateMovie_dto_1 = require("../movie/dto/updateMovie.dto");
const movie_dto_1 = require("../movie/dto/movie.dto");
const recently_added_service_1 = require("./recently-added.service");
let RecentlyAddedController = class RecentlyAddedController {
    constructor(recentService) {
        this.recentService = recentService;
    }
    createMovie(dto) {
        return this.recentService.createMovie(dto);
    }
    getMovies() {
        return this.recentService.getMovies();
    }
    getMovie(id) {
        return this.recentService.getMovie(id);
    }
    updateMovie(dto, id) {
        return this.recentService.updateMovie(id, dto);
    }
    deleteMovie(id) {
        return this.recentService.deleteMovie(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [movie_dto_1.MovieDto]),
    __metadata("design:returntype", void 0)
], RecentlyAddedController.prototype, "createMovie", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecentlyAddedController.prototype, "getMovies", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RecentlyAddedController.prototype, "getMovie", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', pipes_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateMovie_dto_1.UpdateMovieDto, Object]),
    __metadata("design:returntype", void 0)
], RecentlyAddedController.prototype, "updateMovie", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RecentlyAddedController.prototype, "deleteMovie", null);
RecentlyAddedController = __decorate([
    (0, common_1.Controller)('recently-added'),
    __metadata("design:paramtypes", [recently_added_service_1.RecentlyAddedService])
], RecentlyAddedController);
exports.RecentlyAddedController = RecentlyAddedController;
//# sourceMappingURL=recently-added.controller.js.map