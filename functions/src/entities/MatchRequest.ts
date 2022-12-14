import * as admin from 'firebase-admin'

import { UserId } from '../entities/User'
import { DocId } from '../entities/index'

export const MatchRequestsCollection = 'matchRequests'

export type MatchRequestId = DocId

export type MatchRequestStatus = 'searching' | 'matched' | 'canceled'

export type MatchRequest = {
  matchRequestId: MatchRequestId
  createdAt: Date
  matchingDeadline: Date
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
