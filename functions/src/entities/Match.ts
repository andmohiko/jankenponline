import * as admin from 'firebase-admin'

import { User, UserId } from '../entities/User'
import { DocId } from '../entities/index'

export const MatchesCollection = 'matches'

export type MatchId = DocId

export type Rule = 'gachi' | 'casual'

export type Result = 'win' | 'lose'

export type MatchStatus = 'initial' | 'preparing' | 'fighting' | 'finish'

export type MatchUser = {
  userId: UserId
  profileImageUrl: User['profileImageUrl']
  rating: User['rating']
  username: User['username']
}

export type Match = {
  matchId: MatchId
  createdAt: Date
  loserUserId: UserId
  roundWinnerIds: Array<UserId>
  rule: Rule
  season: number
  status: MatchStatus
  updatedAt: Date
  users: Array<MatchUser>
  winnerUserId: UserId
}

export type CreateMatchDto = {
  createdAt: admin.firestore.FieldValue
  rule: Match['rule']
  season: Match['season']
  status: Match['status']
  updatedAt: admin.firestore.FieldValue
  users: Match['users']
}
