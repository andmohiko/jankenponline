import { FieldValue } from 'firebase/firestore'

import { MatchId, Result } from '~/entities/Match'
import { User, UserId } from '~/entities/User'

export type JoinMatch = {
  matchId: MatchId
  createdAt: FieldValue
  opponentId: UserId
  opponentName: User['username']
  opponentProfileImageUrl: User['profileImageUrl']
  result: Result
  season: number
  updatedAt: FieldValue
}
