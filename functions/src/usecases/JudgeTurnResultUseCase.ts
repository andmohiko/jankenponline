import * as admin from 'firebase-admin'

import { Match } from '../entities/Match'
import { TurnResult } from '../entities/TurnResult'
import { getJankenResult } from '../entities/index'
import { serverTimestamp } from '../firebase'
import ThrowRepository from '../repositories/ThrowRepository'
import TurnResultRepository from '../repositories/TurnResultRepository'

export default class JudgeTurnResultUseCase {
  turnResultRepository: TurnResultRepository
  throwRepository: ThrowRepository

  constructor() {
    this.turnResultRepository = new TurnResultRepository()
    this.throwRepository = new ThrowRepository()
  }

  async execute(batch: admin.firestore.WriteBatch, match: Match) {
    const throws = await this.throwRepository.fetchByRoundAndTurn(match)
    if (throws.length !== 2 || throws[0].userId === throws[1].userId) {
      return
    }
    const jankenResult = getJankenResult(throws[0], throws[1])

    const turnResult = {
      createdAt: serverTimestamp,
      loser: jankenResult.loser,
      round: match.round,
      result: jankenResult.result,
      throws: throws.map((t) => {
        return {
          hand: t.hand,
          userId: t.userId,
        }
      }),
      turn: match.turn,
      winner: jankenResult.winner,
    }

    this.turnResultRepository.createByBatch(batch, match.matchId, turnResult)
    return turnResult as unknown as TurnResult
  }
}
