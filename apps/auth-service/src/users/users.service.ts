import { Injectable } from '@nestjs/common'

export type User = {
  userId: number
  username: string
  password: string
}

const users: User[] = [
  { userId: 1, username: 'user1', password: 'qwerty' },
  { userId: 2, username: 'user2', password: 'qwerty' },
  { userId: 3, username: 'user3', password: 'qwerty' },
]

@Injectable()
export class UsersService {
  findUserByName(username: string): User | undefined {
    return users.find(user => user.username === username)
  }
}
