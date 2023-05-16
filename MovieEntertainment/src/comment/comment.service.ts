import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async createComment(dto: CommentDto) {
    const comment = await this.prisma.comment.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        message: dto.message,
      },
    });
    return comment;
  }

  async getComments() {
    const comments = await this.prisma.comment.findMany();
    return comments;
  }

  async getComment(id: number) {
    const comment = await this.prisma.comment.findFirst({
      where: {
        id: id,
      },
    });
    return comment;
  }

  async deleteComment(id: number) {
    const comment = await this.prisma.comment.delete({
      where: {
        id: id,
      },
    });
    return comment;
  }

  async updateComment(id: number, dto: CommentDto) {
    const comment = await this.prisma.comment.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
    return comment;
  }
}
