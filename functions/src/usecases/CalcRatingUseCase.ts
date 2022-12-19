import * as admin from 'firebase-admin'

import { Match } from '../entities/Match'
import { calcRating } from '../entities/Rating'
import { TurnExitStatus } from '../entities/TurnResult'
import { increment, serverTimestamp } from '../firebase'
import MatchRepository from '../repositories/MatchRepository'
import UserRepository from '../repositories/UserRepository'

export default class CalcRatingUseCase {
  userRepository: UserRepository
  matchRepository: MatchRepository

  constructor() {
    this.userRepository = new UserRepository()
    this.matchRepository = new MatchRepository()
  }

  execute(
    batch: admin.firestore.WriteBatch,
    match: Match,
    turnExitStatus: TurnExitStatus,
  ) {
    if (!turnExitStatus.winner || !turnExitStatus.loser) {
      return
    }

    const winnerOriginalRating = match.users.find(
      (u) => u.userId === turnExitStatus.winner,
    )!.rating
    const loserOriginalRating = match.users.find(
      (u) => u.userId === turnExitStatus.loser,
    )!.rating

    // 変動するレートの計算
    const diff = calcRating(winnerOriginalRating, loserOriginalRating)
    this.userRepository.updateByBatch(batch, turnExitStatus.winner, {
      rating: increment(diff),
      updatedAt: serverTimestamp,
    })
    this.userRepository.updateByBatch(batch, turnExitStatus.loser, {
      rating: increment(-diff),
      updatedAt: serverTimestamp,
    })
  }
}
