import * as admin from 'firebase-admin'

import { Match, MatchId, Result } from '../entities/Match'
import { Rating } from '../entities/Rating'
import { User, UserId } from '../entities/User'

export const JoinMatchesCollection = 'joinMatches'

export type JoinMatch = {
  matchId: MatchId
  createdAt: Date
  myBeforeMatchRating: User['rating']
  myAfterMatchRating: User['rating'] | null
  opponentId: UserId
  opponentName: User['username']
  opponentProfileIconUrl: User['profileImageUrl']
  opponentBeforeMatchRating: User['rating']
  opponentAfterMatchRating: User['rating'] | null
  ratingDiff: Rating | null
  result: Result | null
  season: Match['season']
  updatedAt: Date
}

export type CreateJoinMatchDto = {
  createdAt: admin.firestore.FieldValue
  myBeforeMatchRating: JoinMatch['myBeforeMatchRating']
  myAfterMatchRating: JoinMatch['myAfterMatchRating']
  opponentId: JoinMatch['opponentId']
  opponentName: JoinMatch['opponentName']
  opponentProfileIconUrl: JoinMatch['opponentProfileIconUrl']
  opponentBeforeMatchRating: JoinMatch['opponentBeforeMatchRating']
  opponentAfterMatchRating: JoinMatch['opponentAfterMatchRating']
  ratingDiff: JoinMatch['ratingDiff']
  result: JoinMatch['result']
  season: JoinMatch['season']
  updatedAt: admin.firestore.FieldValue
}

export type UpdateJoinMatchDto = {
  myAfterMatchRating?: JoinMatch['myAfterMatchRating']
  opponentAfterMatchRating?: JoinMatch['opponentAfterMatchRating']
  ratingDiff?: JoinMatch['ratingDiff']
  result?: JoinMatch['result']
  updatedAt: admin.firestore.FieldValue
}
