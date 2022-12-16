import { MatchId } from '~/entities/Match'
import { DocId } from '~/entities/index'

export const UsersCollection = 'users'

export type AuthId = string

export type UserId = DocId

export type UserStatus = 'fighting' | 'matching' | 'initial'

export type User = {
  userId: UserId
  currentMatch: MatchId | null
  createdAt: Date
  profileImageUrl: string
  rating: number
  status: UserStatus
  updatedAt: Date
  username: string
}
