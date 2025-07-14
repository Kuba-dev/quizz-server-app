import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { type Request } from 'express'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    )

    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest<Request>()
    const authorization = request.headers.authorization
    const token = authorization?.split(' ')[1]

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      await this.jwtService.verifyAsync(token)
      return true
    } catch {
      throw new UnauthorizedException()
    }
  }
}
