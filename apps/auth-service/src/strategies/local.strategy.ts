import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { SignInData } from '../types/general'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    })
  }

  validate(username: string, password: string): SignInData {
    const user = this.authService.validateUser({ username, password })
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
