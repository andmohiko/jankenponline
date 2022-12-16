import { FieldValue } from 'firebase/firestore'

import { UserId } from '~/entities/User'

export const MatchActionsCollection = 'actions'

export type UserAction = 'ready' | 'concede'

export type MatchAction = {
  createdAt: Date
  userAction: UserAction
  userId: UserId
}

export type CreateMatchActionDto = {
  createdAt: FieldValue
  userAction: MatchAction['userAction']
  userId: MatchAction['userId']
}
