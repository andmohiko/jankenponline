import { collection, addDoc } from 'firebase/firestore'

import { MatchesCollection, MatchId } from '~/entities/Match'
import { CreateThrowDto, ThrowsCollection } from '~/entities/Throw'
import { db } from '~/lib/firebase'

export default class ThrowRepository {
  async create(matchId: MatchId, dto: CreateThrowDto) {
    await addDoc(
      collection(db, MatchesCollection, matchId, ThrowsCollection),
      dto,
    )
  }
}
