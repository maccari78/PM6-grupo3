import { Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, signIn } from 'src/users/dto/create-user.dto';
import { GoogleAuthGuard } from './utils/auth.guard';
import { Request, Response } from 'express';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { RolesGuard } from 'src/users/utils/roles.guard';
// import { Role } from 'src/users/utils/roles.enum';
// import { Roles } from 'src/users/utils/roles.decorator';

@ApiTags('AUTH')
@Controller('auth')
// @UseGuards(RolesGuard)
// @Roles(Role.User, Role.Admin)
export class AuthController {
  constructor(
    private authService: AuthService,
    private googleStrategy: GoogleStrategy,
  ) {}

  @Post('signin')
  signIn(@Body() user: signIn) {
    return this.authService.signIn(user);
  }

  @Post('signup')
  signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  @ApiBearerAuth()
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(@Req() req: Request, @Res() res: Response) {
    const { token, payload } = req.user;
    const createUser = await this.authService.validateUser(payload);
    if (!createUser) {
      res.redirect(`http://localhost:3000/login`);
      return { msg: 'Error al crear el usuario' };
    }
    res.redirect(`http://localhost:3000/auth?token=${token}`);
  }

  @Get('status')
  user(@Req() request: Request) {
    console.log(request.session, 'sesion in status');

    console.log(request.user);
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }

}
