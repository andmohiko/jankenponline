import { MatchesCollection, MatchId } from '../entities/Match'
import {
  MatchAction,
  MatchActionId,
  MatchActionsCollection,
} from '../entities/MatchAction'
import { db } from '../firebase'
import { convertDate } from '../utils/date'

const dateColumns = ['createdAt']

export default class MatchActionRepository {
  async fetchById(
    matchId: MatchId,
    actionId: MatchActionId,
  ): Promise<MatchAction | undefined> {
    const snapshot = await db
      .collection(MatchesCollection)
      .doc(matchId)
      .collection(MatchActionsCollection)
      .doc(actionId)
      .get()
    const data = snapshot.data()
    if (!data) {
      return undefined
    }

    return {
      matchActionId: snapshot.id,
      ...convertDate(data, dateColumns),
    } as MatchAction
  }
}
