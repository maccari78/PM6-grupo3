import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { User } from 'src/users/entities/user.entity';
import { Posts } from 'src/posts/entities/post.entity';
import { ChatController } from './chat.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ChatController],
  imports: [TypeOrmModule.forFeature([Chat, User, Posts]), UsersModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
