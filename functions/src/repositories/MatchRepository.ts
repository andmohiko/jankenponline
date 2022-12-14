import * as admin from 'firebase-admin'

import { CreateMatchDto, MatchesCollection, MatchId } from '../entities/Match'
import { db } from '../firebase'

export default class MatchRepository {
  createByBatch(
    batch: admin.firestore.WriteBatch,
    dto: CreateMatchDto,
  ): MatchId {
    const ref = db.collection(MatchesCollection).doc()
    batch.set(ref, dto)
    return ref.id
  }
}
