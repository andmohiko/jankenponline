import { FieldValue } from 'firebase/firestore'

import { UserId } from '~/entities/User'
import { DocId } from '~/entities/index'

export const MatchActionsCollection = 'actions'

export type UserAction = 'ready' | 'concede'

export type MatchAction = {
  matchActionId: DocId
  createdAt: Date
  userAction: UserAction
  userId: UserId
}

export type CreateMatchActionDto = {
  createdAt: FieldValue
  userAction: MatchAction['userAction']
  userId: MatchAction['userId']
}
