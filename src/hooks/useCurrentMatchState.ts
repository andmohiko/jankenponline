import { useRecoilState } from 'recoil'

import { CurrentMatchState } from '~/atoms/states'
import { Match } from '~/entities/Match'
import { AuthId } from '~/entities/User'
import MatchRepository from '~/repositories/MatchRepository'

export const useCurrentMatchState = (): [
  Match | undefined,
  (newMatchId?: AuthId) => Promise<void>,
] => {
  const [currentMatch, setCurrentMatch] = useRecoilState(CurrentMatchState)
  const matchRepository = new MatchRepository()

  const refetchMatch = async (newMatchId?: AuthId) => {
    const matchId = newMatchId || currentMatch?.matchId
    if (matchId) {
      await matchRepository.subscribeMatch(matchId, setCurrentMatch)
    }
  }
  return [currentMatch, refetchMatch]
}
