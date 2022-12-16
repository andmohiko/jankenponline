import { doc, onSnapshot } from 'firebase/firestore'

import { User, UserId, UsersCollection } from '~/entities/User'
import { db } from '~/lib/firebase'
import { convertDate } from '~/utils/convertDate'

const dateColumns = ['createdAt', 'updatedAt']

export default class UserRepository {
  async subscribeMe(userId: UserId, setUser: any): Promise<void> {
    await new Promise<User>(() => {
      const user = onSnapshot(doc(db, UsersCollection, userId), (snapshot) => {
        const data = snapshot.data()
        if (!data) return
        const user = {
          userId: snapshot.id,
          ...convertDate(data, dateColumns),
        } as User
        setUser(user)
      })
      return user
    })
  }
}
