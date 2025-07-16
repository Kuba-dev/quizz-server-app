import { Injectable } from '@nestjs/common'
import { UsersService } from './users/users.service'
import { JwtService } from '@nestjs/jwt'
import type { AuthInput, Payload, SignInData } from './types/general'
type AccesesToken = { accessToken: string }
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  validateUser({ password, username }: AuthInput): SignInData | null {
    const user = this.usersService.findUserByName(username)

    if (user && user.password === password) {
      return { username: user.username, userId: user.userId }
    }

    return null
  }

  async signIn(user: SignInData): Promise<AccesesToken> {
    const payload: Payload = { username: user.username, sub: user.userId }
    const accessToken = await this.jwtService.signAsync(payload)
    return { accessToken }
  }
}
