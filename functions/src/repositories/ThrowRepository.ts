import { MatchesCollection, MatchId } from '../entities/Match'
import { Throw, ThrowId, ThrowsCollection } from '../entities/Throw'
import { db } from '../firebase'
import { convertDate } from '../utils/date'

const dateColumns = ['createdAt']

export default class ThrowRepository {
  async fetchById(
    matchId: MatchId,
    throwId: ThrowId,
  ): Promise<Throw | undefined> {
    const snapshot = await db
      .collection(MatchesCollection)
      .doc(matchId)
      .collection(ThrowsCollection)
      .doc(throwId)
      .get()
    const data = snapshot.data()
    if (!data) {
      return undefined
    }

    return {
      throwId: snapshot.id,
      ...convertDate(data, dateColumns),
    } as Throw
  }
}
