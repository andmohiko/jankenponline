import * as admin from 'firebase-admin'

import { MatchId } from '../entities/Match'
import { Rating } from '../entities/Rating'
import { DocId } from '../entities/index'

export const UsersCollection = 'users'

export type AuthId = string

export type UserId = DocId

export type UserStatus = 'fighting' | 'matching' | 'initial'

export type User = {
  userId: UserId
  currentMatch: MatchId | null
  createdAt: Date
  profileImageUrl: string
  rating: Rating
  status: UserStatus
  updatedAt: Date
  username: string
}

export type UpdateUserDto = {
  currentMatch?: User['currentMatch']
  rating?: admin.firestore.FieldValue
  status?: User['status']
  updatedAt: admin.firestore.FieldValue
}
