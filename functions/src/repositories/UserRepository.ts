import * as admin from 'firebase-admin'

import { UpdateUserDto, User, UserId, UsersCollection } from '../entities/User'
import { db } from '../firebase'
import { convertDate } from '../utils/date'

const dateColumns = ['createdAt', 'updatedAt']

export default class UserRepository {
  async fetchById(userId: UserId): Promise<User | undefined> {
    const snapshot = await db.collection(UsersCollection).doc(userId).get()
    const data = snapshot.data()
    if (!data) {
      return undefined
    }

    return {
      userId: snapshot.id,
      ...convertDate(data, dateColumns),
    } as User
  }

  updateByBatch(
    batch: admin.firestore.WriteBatch,
    userId: UserId,
    dto: UpdateUserDto,
  ): Promise<void> {
    const ref = db.collection(UsersCollection).doc(userId)
    batch.update(ref, dto)
  }
}
