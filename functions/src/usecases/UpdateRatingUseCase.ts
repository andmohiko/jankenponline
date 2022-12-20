import * as admin from 'firebase-admin'

import { Match } from '../entities/Match'
import { calcRating } from '../entities/Rating'
import { TurnExitStatus } from '../entities/TurnResult'
import { increment, serverTimestamp } from '../firebase'
import JoinMatchRepository from '../repositories/JoinMatchRepository'
import MatchRepository from '../repositories/MatchRepository'
import UserRepository from '../repositories/UserRepository'

export default class UpdateRatingUseCase {
  userRepository: UserRepository
  joinMatchRepository: JoinMatchRepository
  matchRepository: MatchRepository

  constructor() {
    this.userRepository = new UserRepository()
    this.joinMatchRepository = new JoinMatchRepository()
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

    const winner = turnExitStatus.winner
    const loser = turnExitStatus.loser
    const winnerOriginalRating = match.users.find(
      (u) => u.userId === winner,
    )!.rating
    const loserOriginalRating = match.users.find(
      (u) => u.userId === loser,
    )!.rating

    // 変動するレートの計算
    const ratingDiff = calcRating(winnerOriginalRating, loserOriginalRating)

    this.matchRepository.updateByBatch(batch, match.matchId, {
      ratingDiff,
      updatedAt: serverTimestamp,
    })

    this.userRepository.updateByBatch(batch, turnExitStatus.winner, {
      currentMatch: null,
      rating: increment(ratingDiff),
      seasonWins: increment(1),
      totalWins: increment(1),
      updatedAt: serverTimestamp,
    })
    this.userRepository.updateByBatch(batch, turnExitStatus.loser, {
      currentMatch: null,
      rating: increment(-ratingDiff),
      seasonLoses: increment(1),
      totalLoses: increment(1),
      updatedAt: serverTimestamp,
    })

    this.joinMatchRepository.updateByBatch(batch, winner, match.matchId, {
      myAfterMatchRating: winnerOriginalRating + ratingDiff,
      opponentAfterMatchRating: loserOriginalRating - ratingDiff,
      ratingDiff,
      result: 'win',
      updatedAt: serverTimestamp,
    })

    this.joinMatchRepository.updateByBatch(batch, loser, match.matchId, {
      myAfterMatchRating: loserOriginalRating - ratingDiff,
      opponentAfterMatchRating: winnerOriginalRating + ratingDiff,
      ratingDiff,
      result: 'win',
      updatedAt: serverTimestamp,
    })
  }
}
