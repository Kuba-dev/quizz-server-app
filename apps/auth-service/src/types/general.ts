import { Request } from 'express'

export type Payload = {
  username: string
  sub: number
}

export type SignInData = { userId: number; username: string }
export type AuthInput = { username: string; password: string }

export interface AuthenticatedRequest extends Request {
  user: SignInData
}
