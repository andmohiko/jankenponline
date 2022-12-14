import * as admin from 'firebase-admin'

import { MatchUser } from '../entities/Match'
import { serverTimestamp } from '../firebase'
import JoinMatchRepository from '../repositories/JoinMatchRepository'
import MatchRepository from '../repositories/MatchRepository'
import MatchRequestRepository from '../repositories/MatchRequestRepository'
import UserRepository from '../repositories/UserRepository'

export default class MatchUsersUseCase {
  joinMatchRepository: JoinMatchRepository
  matchRepository: MatchRepository
  matchRequestRepository: MatchRequestRepository
  userRepository: UserRepository

  constructor() {
    this.joinMatchRepository = new JoinMatchRepository()
    this.matchRepository = new MatchRepository()
    this.matchRequestRepository = new MatchRequestRepository()
    this.userRepository = new UserRepository()
  }

  async execute(
    batch: admin.firestore.WriteBatch,
    me: MatchUser,
    opponent: MatchUser,
    rule: 'gachi' | 'casual',
    season: number,
  ) {
    const matchId = this.matchRepository.createByBatch(batch, {
      createdAt: serverTimestamp,
      rule,
      season,
      status: 'initial',
      updatedAt: serverTimestamp,
      users: [me, opponent],
    })

    this.joinMatchRepository.createByBatch(batch, me.userId, matchId, {
      createdAt: serverTimestamp,
      opponentId: opponent.userId,
      opponentName: opponent.username,
      opponentProfileIconUrl: opponent.profileImageUrl,
      result: null,
      updatedAt: serverTimestamp,
    })
    this.joinMatchRepository.createByBatch(batch, opponent.userId, matchId, {
      createdAt: serverTimestamp,
      opponentId: me.userId,
      opponentName: me.username,
      opponentProfileIconUrl: me.profileImageUrl,
      result: null,
      updatedAt: serverTimestamp,
    })

    this.userRepository.updateByBatch(batch, me.userId, {
      currentMatch: matchId,
      status: 'fighting',
      updatedAt: serverTimestamp,
    })
    this.userRepository.updateByBatch(batch, opponent.userId, {
      currentMatch: matchId,
      status: 'fighting',
      updatedAt: serverTimestamp,
    })
  }
}
