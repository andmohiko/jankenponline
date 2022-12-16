import { FieldValue } from 'firebase/firestore'

import { UserId } from '~/entities/User'
import { DocId, JankenHand } from '~/entities/index'

export type ThrowId = DocId

export type Throw = {
  throwId: ThrowId
  createdAt: FieldValue
  hand: JankenHand
  round: number
  userId: UserId
}
