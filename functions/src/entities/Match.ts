import { User, UserId } from '../entities/User'
import { DocId } from '../entities/index'

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
