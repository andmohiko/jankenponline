import { Rating } from '~/entities/Rating'
import { User, UserId } from '~/entities/User'
import { DocId, StringKeyObject } from '~/entities/index'

export const MatchesCollection = 'matches'

export type MatchId = DocId

export type Rule = 'gachi' | 'casual'

export type Result = 'win' | 'lose'

export const ResultLabel: StringKeyObject = {
  win: '勝ち',
  lose: '負け',
}

export type MatchStatus = 'initial' | 'preparing' | 'fighting' | 'finish'

export const MatchStatusLabel: StringKeyObject = {
  initial: 'マッチ済み',
  preparing: '準備中',
  fighting: '試合中',
  finish: '試合終了',
}

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
  createdAt: Date
  loser: UserId | null
  ratingDiff: Rating | null
  round: number
  roundWinners: Array<UserId>
  rule: Rule
  season: number
  status: MatchStatus
  turn: number
  updatedAt: Date
  users: Array<MatchUser>
  winner: UserId
}
