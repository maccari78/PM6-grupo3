import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/users/utils/roles.guard';
import { Roles } from 'src/users/utils/roles.decorator';
import { Role } from 'src/users/utils/roles.enum';
import { CustomHeaderGuard } from 'src/middleweare/protectedEndpoints.guard';

@ApiTags('CHAT')
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get(':id/messages')
  @Roles(Role.User, Role.Admin)
  @UseGuards(RolesGuard, CustomHeaderGuard)
  async getChatByRoom_ID(@Param('id') room_id: string) {
    return await this.chatService.findAllByRoom_ID(room_id);
  }
}
