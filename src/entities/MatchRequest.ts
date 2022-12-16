import { FieldValue } from 'firebase/firestore'

import { UserId, User } from '~/entities/User'
import { DocId } from '~/entities/index'

export const MatchRequestsCollection = 'matchRequests'

export type MatchRequestId = DocId

export type MatchRequestStatus = 'searching' | 'matched' | 'canceled'

export type MatchRequest = {
  matchRequestId: MatchRequestId
  createdAt: Date
  matchingDeadline: Date
  profileImageUrl: User['profileImageUrl']
  rating: number
  status: MatchRequestStatus
  updatedAt: Date
  userId: UserId
  username: string
}

export type CreateMatchRequestDto = {
  createdAt: FieldValue
  matchingDeadline: MatchRequest['matchingDeadline']
  profileImageUrl: MatchRequest['profileImageUrl']
  rating: MatchRequest['rating']
  status: MatchRequest['status']
  updatedAt: FieldValue
  userId: MatchRequest['userId']
  username: MatchRequest['username']
}
