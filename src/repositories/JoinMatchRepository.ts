import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'

import { JoinMatch, JoinMatchesCollection } from '~/entities/JoinMatch'
import { UserId, UsersCollection } from '~/entities/User'
import { db } from '~/lib/firebase'
import { convertDate } from '~/utils/convertDate'

const dateColumns = ['createdAt', 'updatedAt']

export default class JoinMatchRepository {
  async fetchLatest(userId: UserId): Promise<Array<JoinMatch>> {
    const snapshot = await getDocs(
      query(
        collection(db, UsersCollection, userId, JoinMatchesCollection),
        orderBy('createdAt', 'desc'),
        limit(50),
      ),
    )
    return snapshot.docs
      .map((doc) => {
        const data = doc.data()
        return {
          matchId: doc.id,
          ...convertDate(data, dateColumns),
        } as JoinMatch
      })
      .filter((m) => m.result !== null)
  }
}
