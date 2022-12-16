import { DocId } from '../entities'
import { UserId } from '../entities/User'

export const MatchActionsCollection = 'actions'

export type UserAction = 'ready' | 'concede'

export type MatchActionId = DocId

export type MatchAction = {
  matchActionId: MatchActionId
  createdAt: Date
  userAction: UserAction
  userId: UserId
}
