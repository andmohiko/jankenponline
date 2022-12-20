import * as admin from 'firebase-admin'

import {
  CreateMatchDto,
  MatchesCollection,
  MatchId,
  Match,
  UpdateMatchDto,
} from '../entities/Match'
import { db } from '../firebase'
import { convertDate } from '../utils/date'

const dateColumns = ['createdAt', 'updatedAt']

export default class MatchRepository {
  async fetchById(matchId: MatchId): Promise<Match | undefined> {
    const snapshot = await db.collection(MatchesCollection).doc(matchId).get()
    const data = snapshot.data()
    if (!data) {
      return undefined
    }

    return {
      matchId: snapshot.id,
      ...convertDate(data, dateColumns),
    } as Match
  }

  createByBatch(
    batch: admin.firestore.WriteBatch,
    dto: CreateMatchDto,
  ): MatchId {
    const ref = db.collection(MatchesCollection).doc()
    batch.set(ref, dto)
    return ref.id
  }

  async update(matchId: MatchId, dto: UpdateMatchDto) {
    await db.collection(MatchesCollection).doc(matchId).update(dto)
  }

  updateByBatch(
    batch: admin.firestore.WriteBatch,
    matchId: MatchId,
    dto: UpdateMatchDto,
  ) {
    const ref = db.collection(MatchesCollection).doc(matchId)
    batch.update(ref, dto)
  }
}
