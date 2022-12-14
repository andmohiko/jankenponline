import * as admin from 'firebase-admin'

import { User, UserId } from '../entities/User'
import { DocId } from '../entities/index'

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

export type UpdateMatchRequestDto = {
  status?: MatchRequest['status']
  updatedAt: admin.firestore.FieldValue
}
