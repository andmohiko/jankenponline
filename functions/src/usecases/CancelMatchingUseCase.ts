import * as admin from 'firebase-admin'

import { MatchRequest } from '../entities/MatchRequest'
import { serverTimestamp } from '../firebase'
import JoinMatchRepository from '../repositories/JoinMatchRepository'
import MatchRequestRepository from '../repositories/MatchRequestRepository'
import UserRepository from '../repositories/UserRepository'

export default class CancelMatchingUseCase {
  joinMatchRepository: JoinMatchRepository
  matchRequestRepository: MatchRequestRepository
  userRepository: UserRepository

  constructor() {
    this.joinMatchRepository = new JoinMatchRepository()
    this.matchRequestRepository = new MatchRequestRepository()
    this.userRepository = new UserRepository()
  }

  async execute(batch: admin.firestore.WriteBatch, matchRequest: MatchRequest) {
    this.matchRequestRepository.updateByBatch(
      batch,
      matchRequest.matchRequestId,
      {
        status: 'canceled',
        updatedAt: serverTimestamp,
      },
    )
    this.userRepository.updateByBatch(batch, matchRequest.userId, {
      status: 'initial',
      updatedAt: serverTimestamp,
    })
  }
}
