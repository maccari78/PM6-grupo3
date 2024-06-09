import { Controller, Get, Param, /* UseGuards */ } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiTags } from '@nestjs/swagger';
// import { RolesGuard } from 'src/users/utils/roles.guard';

@ApiTags('CHAT')
@Controller('chat')
// @UseGuards(RolesGuard)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get(':id/messages')
  async getChatByRoom_ID(@Param('id') room_id: string) {
    return await this.chatService.findAllByRoom_ID(room_id);
  }
  
}
