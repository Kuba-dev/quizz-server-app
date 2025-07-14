import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from './users/users.service'

type AuthInput = { username: string; password: string }
type SignInData = { userId: number; username: string }
type AuthResult = { accessToken: string; userId: number; username: string }

@Injectable()
export class AuthService {
  constructor(private readonly usersServices: UsersService) {}

  authenticate({ password, username }: AuthInput): AuthResult {
    const user = this.validateUser({ password, username })

    if (!user) {
      throw new UnauthorizedException()
    }

    return {
      accessToken: 'fake-token',
      ...user,
    }
  }

  validateUser({ password, username }: AuthInput): SignInData | null {
    const user = this.usersServices.findUserByName(username)

    if (user && user.password === password) {
      return {
        userId: user.userId,
        username: user.username,
      }
    }

    return null
  }
}
