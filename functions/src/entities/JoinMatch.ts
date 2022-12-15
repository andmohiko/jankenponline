import * as admin from 'firebase-admin'

import { MatchId } from '../entities/Match'
import { User, UserId } from '../entities/User'

export const JoinMatchesCollection = 'joinMatches'

export type JoinMatch = {
  matchId: MatchId
  createdAt: Date
  opponentId: UserId
  opponentName: User['username']
  opponentProfileIconUrl: User['profileImageUrl']
  result: string | null
  updatedAt: Date
}

export type CreateJoinMatchDto = {
  createdAt: admin.firestore.FieldValue
  opponentId: JoinMatch['opponentId']
  opponentName: JoinMatch['opponentName']
  opponentProfileIconUrl: JoinMatch['opponentProfileIconUrl']
  result: JoinMatch['result']
  updatedAt: admin.firestore.FieldValue
}
