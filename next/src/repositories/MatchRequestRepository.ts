import { collection, addDoc } from 'firebase/firestore'

import {
  CreateMatchRequestDto,
  MatchRequestsCollection,
} from '~/entities/MatchRequest'
import { db } from '~/lib/firebase'

export default class MatchRequestRepository {
  async create(dto: CreateMatchRequestDto) {
    console.log(dto)
    await addDoc(collection(db, MatchRequestsCollection), dto)
  }
}
