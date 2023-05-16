import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { CommentService } from './comment.service';
import { CommentDto } from './dto';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}
  @Get()
  getComments(): Promise<CommentDto[]> {
    return this.commentService.getComments();
  }
  @Get(':id')
  getComment(@Param('id', ParseIntPipe) id: number): Promise<CommentDto> {
    return this.commentService.getComment(id);
  }
  @Post()
  createComment(@Body() dto: CommentDto) {
    return this.commentService.createComment(dto);
  }
  @Delete(':id')
  deleteComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.deleteComment(id);
  }
  @Put(':id')
  updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CommentDto,
  ) {
    return this.commentService.updateComment(id, dto);
  }
}
