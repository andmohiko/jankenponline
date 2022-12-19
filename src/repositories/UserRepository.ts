import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'

import type { SetterOrUpdater } from 'recoil'

import {
  AuthId,
  CreateUserDto,
  User,
  UserId,
  UsersCollection,
} from '~/entities/User'
import { db } from '~/lib/firebase'
import { convertDate } from '~/utils/convertDate'

const dateColumns = ['createdAt', 'updatedAt']

export default class UserRepository {
  async create(authId: AuthId, dto: CreateUserDto): Promise<void> {
    setDoc(doc(db, UsersCollection, authId), dto)
  }

  async subscribeMe(
    userId: UserId,
    setUser: SetterOrUpdater<User>,
  ): Promise<void> {
    await new Promise<User>(() => {
      const user = onSnapshot(doc(db, UsersCollection, userId), (snapshot) => {
        const data = snapshot.data()
        if (!data) {
          throw new Error(`No data for user: ${userId}`)
        }

        const user = {
          userId: snapshot.id,
          ...convertDate(data, dateColumns),
        } as User
        setUser(user)
      })
      return user
    })
  }

  async isExists(authId: AuthId): Promise<boolean> {
    const snapshot = await getDoc(doc(db, UsersCollection, authId))
    return snapshot.exists()
  }
}
