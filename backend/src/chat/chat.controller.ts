import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/users/utils/roles.guard';
import { Roles } from 'src/users/utils/roles.decorator';
import { Role } from 'src/users/utils/roles.enum';

@ApiTags('CHAT')
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) { }

  @Get(':id/messages')
  @UseGuards(RolesGuard)
  @Roles(Role.User, Role.Admin)
  async getChatByRoom_ID(@Param('id') room_id: string) {
    return await this.chatService.findAllByRoom_ID(room_id);
  }

}
