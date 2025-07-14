import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { PublicRoute } from './decorators/public.decorator'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicRoute()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() input: LoginDto) {
    return this.authService.authenticate(input)
  }

  @Get('protected')
  getData() {
    return 'important data'
  }
}
