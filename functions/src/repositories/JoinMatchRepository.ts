import * as admin from 'firebase-admin'

import {
  CreateJoinMatchDto,
  JoinMatchesCollection,
  UpdateJoinMatchDto,
} from '../entities/JoinMatch'
import { MatchId } from '../entities/Match'
import { UserId, UsersCollection } from '../entities/User'
import { db } from '../firebase'

export default class JoinMatchRepository {
  createByBatch(
    batch: admin.firestore.WriteBatch,
    userId: UserId,
    matchId: MatchId,
    dto: CreateJoinMatchDto,
  ): void {
    const ref = db
      .collection(UsersCollection)
      .doc(userId)
      .collection(JoinMatchesCollection)
      .doc(matchId)
    batch.set(ref, dto)
  }

  updateByBatch(
    batch: admin.firestore.WriteBatch,
    userId: UserId,
    matchId: MatchId,
    dto: UpdateJoinMatchDto,
  ) {
    const ref = db
      .collection(UsersCollection)
      .doc(userId)
      .collection(JoinMatchesCollection)
      .doc(matchId)
    batch.update(ref, dto)
  }
}
