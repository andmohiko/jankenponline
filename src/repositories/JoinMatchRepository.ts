import { collection, getDocs, limit, query } from 'firebase/firestore'

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
        limit(20),
      ),
    )
    return snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        matchId: doc.id,
        ...convertDate(data, dateColumns),
      } as JoinMatch
    })
  }
}
