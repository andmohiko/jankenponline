import * as admin from 'firebase-admin'

import { UserId } from '../entities//User'
import { Throw } from '../entities/Throw'
import { DocId } from '../entities/index'

export const TurnResultsCollection = 'turnResults'

export type Result = 'settled' | 'draw'

export type TurnThrow = {
  hand: Throw['hand']
  userId: UserId
}

export type TurnResultId = DocId

export type TurnResult = {
  turnResultId: TurnResultId
  createdAt: Date
  loser: UserId | null
  round: number
  result: Result
  throws: Array<TurnThrow>
  turn: number
  winner: UserId | null
}

export type CreateTurnResultDto = {
  createdAt: admin.firestore.FieldValue
  loser: TurnResult['loser']
  round: TurnResult['round']
  result: TurnResult['result']
  throws: TurnResult['throws']
  turn: TurnResult['turn']
  winner: TurnResult['winner']
}

export type TurnExitStatus = {
  loser: TurnResult['loser']
  status: 'nextTurn' | 'nextRound' | 'finish'
  winner: TurnResult['winner']
}
