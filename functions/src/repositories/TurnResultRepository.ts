import * as admin from 'firebase-admin'

import { MatchesCollection, MatchId } from '../entities/Match'
import {
  CreateTurnResultDto,
  TurnResultsCollection,
} from '../entities/TurnResult'
import { db } from '../firebase'

export default class TurnResultRepository {
  createByBatch(
    batch: admin.firestore.WriteBatch,
    matchId: MatchId,
    dto: CreateTurnResultDto,
  ): void {
    const ref = db
      .collection(MatchesCollection)
      .doc(matchId)
      .collection(TurnResultsCollection)
      .doc()
    batch.set(ref, dto)
  }
}
