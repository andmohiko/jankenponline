import { FieldValue } from 'firebase/firestore'

import { MatchId } from '~/entities/Match'
import { Rating } from '~/entities/Rating'
import { DocId } from '~/entities/index'

export const UsersCollection = 'users'

export const DefaultIconUrl =
  'https://firebasestorage.googleapis.com/v0/b/jankenponline.appspot.com/o/images%2Frock.png?alt=media&token=0587aa26-284b-46b0-a8fd-c832eadc29d7'

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

export type CreateUserDto = {
  createdAt: FieldValue
  profileImageUrl: User['profileImageUrl']
  rating: User['rating']
  status: User['status']
  updatedAt: FieldValue
  username: User['username']
}
