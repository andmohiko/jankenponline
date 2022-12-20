import { MatchId, Result } from '~/entities/Match'
import { Rating } from '~/entities/Rating'
import { User, UserId } from '~/entities/User'

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
  updatedAt: Date
}
