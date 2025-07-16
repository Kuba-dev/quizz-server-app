import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { EnvAuth } from '../constants/env'
import { ConfigService } from '@nestjs/config'
import { Payload } from '../types/general'

const { JwtSecret } = EnvAuth

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(JwtSecret)!,
    })
  }

  validate(payload: Payload) {
    return { userId: payload.sub, username: payload.username }
  }
}
