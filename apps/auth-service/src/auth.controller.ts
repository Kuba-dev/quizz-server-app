import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PublicRoute } from './decorators/public.decorator'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { JwtAuthGuard } from './guards/jwt-auth-guard'
import { AuthenticatedRequest } from './types/general'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicRoute()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: AuthenticatedRequest) {
    console.log('Login request:', req.user)
    return this.authService.signIn(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: AuthenticatedRequest) {
    return req.user
  }

  @PublicRoute()
  @Get('public')
  getPublicData() {
    return 'public data'
  }
}
