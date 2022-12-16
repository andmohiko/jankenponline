import { FieldValue } from 'firebase/firestore'

import { UserId } from '~/entities/User'
import { DocId } from '~/entities/index'

export type ThrowId = DocId

export type Hand = 'rock' | 'paper' | 'scissors'

export type Throw = {
  throwId: ThrowId
  createdAt: FieldValue
  hand: Hand
  round: number
  userId: UserId
}
