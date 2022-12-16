import { doc, onSnapshot } from 'firebase/firestore'

import { Match, MatchesCollection, MatchId } from '~/entities/Match'
import { db } from '~/lib/firebase'
import { convertDate } from '~/utils/convertDate'

const dateColumns = ['createdAt', 'updatedAt']

export default class MatchRepository {
  async subscribeMatch(
    matchId: MatchId,
    setMatch: any,
  ): Promise<void> {
    await new Promise<Match>(() => {
      const match = onSnapshot(
        doc(db, MatchesCollection, matchId),
        (snapshot) => {
          const data = snapshot.data()
          if (!data) return

          const match = {
            matchId: snapshot.id,
            ...convertDate(data, dateColumns),
          } as Match
          setMatch(match)
        },
      )
      return match
    })
  }
}
