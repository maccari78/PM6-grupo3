import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    const newComment = this.commentRepository.create(createCommentDto);
    if (!newComment) {
      throw new BadRequestException('Error al crear el comentario');
    }
    await this.commentRepository.save(newComment);
    return 'Comentario creado con exito';
  }

  async findOne(id: string) {
    const comment = await this.commentRepository.findOneBy({ id });
    if (!comment) {
      throw new BadRequestException('Comentario no encontrado');
    }
    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.update(id, updateCommentDto);
    if (!comment) {
      throw new BadRequestException('Error al actualizar el comentario');
    }
    return 'Comentario actualizado con exito';
  }

  async remove(id: string) {
    const comment = await this.commentRepository.delete(id);
    if (!comment) {
      throw new BadRequestException('Error al eliminar el comentario');
    }
    return 'Comentario eliminado con exito';
  }
}
