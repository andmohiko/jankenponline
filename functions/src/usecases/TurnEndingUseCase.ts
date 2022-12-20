import * as admin from 'firebase-admin'

import { Match } from '../entities/Match'
import { TurnExitStatus, TurnResult } from '../entities/TurnResult'
import { increment, serverTimestamp } from '../firebase'
import JoinMatchRepository from '../repositories/JoinMatchRepository'
import MatchRepository from '../repositories/MatchRepository'
import MatchRequestRepository from '../repositories/MatchRequestRepository'
import ThrowRepository from '../repositories/ThrowRepository'
import TurnResultRepository from '../repositories/TurnResultRepository'
import UserRepository from '../repositories/UserRepository'

export default class TurnEndingUseCase {
  joinMatchRepository: JoinMatchRepository
  matchRequestRepository: MatchRequestRepository
  userRepository: UserRepository
  matchRepository: MatchRepository
  throwRepository: ThrowRepository
  turnResultRepository: TurnResultRepository

  constructor() {
    this.joinMatchRepository = new JoinMatchRepository()
    this.matchRequestRepository = new MatchRequestRepository()
    this.userRepository = new UserRepository()
    this.matchRepository = new MatchRepository()
    this.throwRepository = new ThrowRepository()
    this.turnResultRepository = new TurnResultRepository()
  }

  execute(
    batch: admin.firestore.WriteBatch,
    match: Match,
    turnResult: TurnResult,
  ): TurnExitStatus {
    // あいこのとき
    if (turnResult.result === 'draw') {
      this.matchRepository.updateByBatch(batch, match.matchId, {
        turn: increment(1),
        users: match.users.map((u) => {
          return {
            ...u,
            actionStatus: 'thinking',
          }
        }),
        updatedAt: serverTimestamp,
      })
      return {
        status: 'nextTurn',
        winner: null,
        loser: null,
      }
    }

    const user1wins =
      match.users.find((u) => u.userId === turnResult.winner)!.wins + 1
    const user2wins = match.users.find(
      (u) => u.userId === turnResult.loser,
    )!.wins
    // 次のラウンドにいくとき
    // 勝った方がまだ3勝していなければ次のラウンドに行く
    if (user1wins < 3) {
      this.matchRepository.updateByBatch(batch, match.matchId, {
        round: increment(1),
        roundWinners: [...match.roundWinners, turnResult.winner!],
        turn: 1,
        users: match.users.map((u) => {
          return {
            ...u,
            actionStatus: 'thinking',
            wins: turnResult.winner === u.userId ? user1wins : user2wins,
          }
        }),
        updatedAt: serverTimestamp,
      })
      return {
        status: 'nextRound',
        winner: null,
        loser: null,
      }
    }

    // 試合終了のとき
    // このターンで決着がついたということはこのターンの勝者が試合の勝者になる
    const winner = turnResult.winner!
    const loser = turnResult.loser!

    this.matchRepository.updateByBatch(batch, match.matchId, {
      loser,
      roundWinners: [...match.roundWinners, turnResult.winner!],
      status: 'finish',
      users: match.users.map((u) => {
        return {
          ...u,
          actionStatus: 'receivedResult',
          wins: turnResult.winner === u.userId ? u.wins + 1 : u.wins,
        }
      }),
      updatedAt: serverTimestamp,
      winner,
    })
    return {
      status: 'finish',
      winner,
      loser,
    }
  }
}
