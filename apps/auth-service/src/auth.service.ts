import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from './users/users.service'
import { JwtService } from '@nestjs/jwt'

type AuthInput = { username: string; password: string }
type SignInData = { userId: number; username: string }
type AuthResult = { accessToken: string; userId: number; username: string }

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  authenticate({ password, username }: AuthInput): Promise<AuthResult> {
    const user = this.validateUser({ password, username })

    if (!user) {
      throw new UnauthorizedException()
    }

    return this.signIn(user)
  }

  validateUser({ password, username }: AuthInput): SignInData | null {
    const user = this.usersService.findUserByName(username)

    if (user && user.password === password) {
      return {
        userId: user.userId,
        username: user.username,
      }
    }

    return null
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const accessToken = await this.jwtService.signAsync(user)
    return { accessToken, ...user }
  }
}
