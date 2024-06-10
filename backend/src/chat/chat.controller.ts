import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CHAT')
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get(':id/messages')
  async getChatByRoom_ID(@Param('id') room_id: string) {
    return await this.chatService.findAllByRoom_ID(room_id);
  }
  
}
