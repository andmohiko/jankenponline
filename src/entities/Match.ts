import { FieldValue } from 'firebase/firestore'

import { User, UserId } from '~/entities/User'
import { DocId, StringKeyObject } from '~/entities/index'

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

export const ActionStatusLabel: StringKeyObject = {
  preparing: '準備中',
  ready: '準備完了',
  thinking: '考え中',
  throwed: '決定',
  receivedResult: '確認済み',
}

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
  createdAt: FieldValue
  loserUserId: UserId
  roundWinnerIds: Array<UserId>
  rule: Rule
  season: number
  status: MatchStatus
  updatedAt: FieldValue
  users: Array<MatchUser>
  winnerUserId: UserId
}
