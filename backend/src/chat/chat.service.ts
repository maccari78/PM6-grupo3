import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { User } from 'src/users/entities/user.entity';
import { Posts } from 'src/posts/entities/post.entity';
import { MessageChat } from './interfaces/usersChat.interfaces';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/rentals/interfaces/payload.interfaces';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
    private jwtService: JwtService,
  ) {}
  async create(payload: CreateChatDto, token: string) {
    const { room_id, message } = payload;

    const newChat = this.chatRepository.create({ message, room_id });
    const postId = room_id.substring(0, 36);
    const post = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ['user'],
    });
    if (!post) throw new NotFoundException('Publicacion no encontrada');

    const payloadJwt: JwtPayload = await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    if (!payloadJwt) throw new UnauthorizedException('token invalido');
    const userSender = await this.usersRepository.findOneBy({
      email: payloadJwt.sub,
    });
    if (!userSender) throw new NotFoundException('Usuario no encontrado');
    newChat.sender = userSender;

    if (userSender.id !== post.user.id) {
      newChat.receiver = post.user;
      await this.chatRepository.save(newChat);
      if (!newChat) throw new BadRequestException('Error al enviar el chat');
      if (newChat.image) {
        return await this.createChatWithImage(newChat);
      }
      return await this.createChatWithoutImage(newChat);
    }
    const receiverId = room_id.substring(36);
    const findUser = await this.usersRepository.findOneBy({ id: receiverId });
    if (!findUser) throw new NotFoundException('Usuario no encontrado');
    newChat.receiver = findUser;
    await this.chatRepository.save(newChat);
    if (!newChat) throw new BadRequestException('Error al enviar el chat');
    if (newChat.image) {
      return await this.createChatWithImage(newChat);
    }
    return await this.createChatWithoutImage(newChat);
  }
  async createChatWithImage(newChat: Chat) {
    const messageContent: MessageChat = {
      message: newChat.message,
      sender: newChat.sender,
      receiver: newChat.receiver,
      room_id: newChat.room_id,
      image: newChat.image,
      date_created: newChat.date_created,
    };
    return messageContent;
  }
  async createChatWithoutImage(newChat: Chat) {
    const messageContent: MessageChat = {
      message: newChat.message,
      sender: newChat.sender,
      receiver: newChat.receiver,
      room_id: newChat.room_id,
      date_created: newChat.date_created,
    };
    return messageContent;
  }

  findAllByRoom_ID(room_id: string) {
    const chatHistory = this.chatRepository.find({
      where: { room_id: room_id },
      order: { date_created: 'DESC' },
    });
    if (chatHistory === null)
      throw new NotFoundException('Historial de chat vacio');
    return chatHistory;
  }
}
