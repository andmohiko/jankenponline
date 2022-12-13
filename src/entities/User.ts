import { FieldValue } from 'firebase/firestore'

import { MatchId } from '~/entities/Match'
import { DocId } from '~/entities/index'

export type UserId = DocId

export type User = {
  userId: UserId
  currentMatch: MatchId
  createdAt: FieldValue
  profileImageUrl: string
  rating: number
  twitterId: string
  updatedAt: FieldValue
  username: string
}
