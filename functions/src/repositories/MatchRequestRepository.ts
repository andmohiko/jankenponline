import * as admin from 'firebase-admin'

import {
  MatchRequest,
  MatchRequestId,
  MatchRequestsCollection,
  UpdateMatchRequestDto,
} from '../entities/MatchRequest'
import { db } from '../firebase'
import { convertDate } from '../utils/date'

const dateColumns = ['createdAt', 'matchingDeadline', 'updatedAt']

export default class MatchRequestRepository {
  async fetchSearching(): Promise<Array<MatchRequest>> {
    const snapshot = await db
      .collection(MatchRequestsCollection)
      .where('status', '==', 'searching')
      .get()
    return snapshot.docs
      .map((doc) => {
        return {
          matchRequestId: doc.id,
          ...convertDate(doc.data(), dateColumns),
        } as MatchRequest
      })
      .sort((a, b) => (a.matchingDeadline < b.matchingDeadline ? -1 : 1))
  }

  async fetchByMatchingDeadline(
    start: Date,
    cancelMatchingTime: Date,
  ): Promise<Array<MatchRequest>> {
    const snapshot = await db
      .collection(MatchRequestsCollection)
      .where('createdAt', '>', start)
      .where('createdAt', '<', cancelMatchingTime)
      .where('status', '==', 'searching')
      .get()
    return snapshot.docs
      .map((doc) => {
        return {
          matchRequestId: doc.id,
          ...convertDate(doc.data(), dateColumns),
        } as MatchRequest
      })
      .sort((a, b) => (a.rating < b.rating ? -1 : 1))
  }

  async fetchById(
    matchRequestId: MatchRequestId,
  ): Promise<MatchRequest | undefined> {
    const snapshot = await db
      .collection(MatchRequestsCollection)
      .doc(matchRequestId)
      .get()
    const data = snapshot.data()
    if (!data) {
      return undefined
    }

    return {
      matchRequestId: snapshot.id,
      ...convertDate(data, dateColumns),
    } as MatchRequest
  }

  updateByBatch(
    batch: admin.firestore.WriteBatch,
    matchRequestId: MatchRequestId,
    dto: UpdateMatchRequestDto,
  ): void {
    const ref = db.collection(MatchRequestsCollection).doc(matchRequestId)
    batch.update(ref, dto)
  }
}
