import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('login')
  @UseGuards(AuthGuard('auth0'))
  login() {
    // Auth0 login will redirect here
  }

  @Get('callback')
  @UseGuards(AuthGuard('auth0'))
  callback(@Req() req, @Res() res) {
    res.redirect('/');
  }

  @Get('logout')
  logout(@Req() req, @Res() res) {
    req.logout();
    res.redirect('/');
  }
}
