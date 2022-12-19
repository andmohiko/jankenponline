import * as admin from 'firebase-admin'

import { MatchUser } from '../entities/Match'
import { MatchRequest } from '../entities/MatchRequest'
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
    myRequest: MatchRequest,
    opponentRequest: MatchRequest,
    rule: 'gachi' | 'casual',
    season: number,
  ) {
    const me: MatchUser = {
      actionStatus: 'preparing',
      profileImageUrl: myRequest.profileImageUrl,
      rating: myRequest.rating,
      userId: myRequest.userId,
      username: myRequest.username,
      wins: 0,
    }
    const opponent: MatchUser = {
      actionStatus: 'preparing',
      profileImageUrl: opponentRequest.profileImageUrl,
      rating: opponentRequest.rating,
      userId: opponentRequest.userId,
      username: opponentRequest.username,
      wins: 0,
    }

    const matchId = this.matchRepository.createByBatch(batch, {
      createdAt: serverTimestamp,
      round: 1,
      rule,
      season,
      status: 'initial',
      turn: 1,
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

    this.matchRequestRepository.updateByBatch(batch, myRequest.matchRequestId, {
      status: 'matched',
      updatedAt: serverTimestamp,
    })
    this.matchRequestRepository.updateByBatch(
      batch,
      opponentRequest.matchRequestId,
      {
        status: 'matched',
        updatedAt: serverTimestamp,
      },
    )
  }
}
