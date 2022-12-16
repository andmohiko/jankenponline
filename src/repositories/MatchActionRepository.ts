import { collection, addDoc } from 'firebase/firestore'

import { MatchesCollection, MatchId } from '~/entities/Match'
import {
  CreateMatchActionDto,
  MatchActionsCollection,
} from '~/entities/MatchAction'
import { db } from '~/lib/firebase'

export default class MatchActionRepository {
  async create(matchId: MatchId, dto: CreateMatchActionDto) {
    await addDoc(
      collection(db, MatchesCollection, matchId, MatchActionsCollection),
      dto,
    )
  }
}
