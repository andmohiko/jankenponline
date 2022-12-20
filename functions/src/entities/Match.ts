import * as admin from 'firebase-admin'

import { Rating } from '../entities/Rating'
import { User, UserId } from '../entities/User'
import { DocId } from '../entities/index'

export const MatchesCollection = 'matches'

export type MatchId = DocId

export type Rule = 'gachi' | 'casual'

export type Result = 'win' | 'lose'

export type MatchStatus = 'initial' | 'preparing' | 'fighting' | 'finish'

export type ActionStatus =
  | 'preparing'
  | 'ready'
  | 'thinking'
  | 'throwed'
  | 'receivedResult'

export type MatchUser = {
  userId: UserId
  actionStatus: ActionStatus
  profileImageUrl: User['profileImageUrl']
  rating: User['rating']
  username: User['username']
  wins: number
}

export type Match = {
  matchId: MatchId
  createdAt: Date
  loser: UserId
  ratingDiff: Rating | null
  round: number
  roundWinnerIds: Array<UserId>
  rule: Rule
  season: number
  status: MatchStatus
  turn: number
  updatedAt: Date
  users: Array<MatchUser>
  winner: UserId
}

export type CreateMatchDto = {
  createdAt: admin.firestore.FieldValue
  ratingDiff: Match['ratingDiff']
  round: Match['round']
  rule: Match['rule']
  season: Match['season']
  status: Match['status']
  turn: Match['turn']
  updatedAt: admin.firestore.FieldValue
  users: Match['users']
}

export type UpdateMatchDto = {
  loser?: Match['loser']
  ratingDiff?: Match['ratingDiff']
  round?: Match['round'] | admin.firestore.FieldValue
  roundWinnerIds?: admin.firestore.FieldValue
  status?: Match['status']
  turn?: Match['turn'] | admin.firestore.FieldValue
  updatedAt: admin.firestore.FieldValue
  users?: Match['users']
  winner?: Match['winner']
}
