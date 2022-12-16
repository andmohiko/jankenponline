import { UserId } from '../entities/User'
import { DocId, JankenHand } from '../entities/index'

export const ThrowsCollection = 'throws'

export type ThrowId = DocId

export type Throw = {
  throwId: ThrowId
  createdAt: Date
  hand: JankenHand
  round: number
  turn: number
  userId: UserId
}
