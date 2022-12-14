import { getDoc, doc } from 'firebase/firestore'

import { User, UserId, UsersCollection } from '~/entities/User'
import { db } from '~/lib/firebase'
import { convertDate } from '~/utils/convertDate'

const dateColumns = ['createdAt', 'updatedAt']

export default class UserRepository {
  async fetchById(userId: UserId): Promise<User | undefined> {
    const snapshot = await getDoc(doc(db, UsersCollection, userId))
    const data = snapshot.data()
    if (!data) {
      return undefined
    }
    return {
      userId: snapshot.id,
      ...convertDate(data, dateColumns),
    } as User
  }
}
