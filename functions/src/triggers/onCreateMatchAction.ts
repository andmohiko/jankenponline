import * as functions from 'firebase-functions'

import MatchActionRepository from '../repositories/MatchActionRepository'
import MatchRepository from '../repositories/MatchRepository'
import SetUserReadyUseCase from '../usecases/SetUserReadyUseCase'
import { triggerOnce } from '../utils/triggerOnce'

const matchActionRepository = new MatchActionRepository()
const matchRepository = new MatchRepository()
const setUserReadyUseCase = new SetUserReadyUseCase()

const onCreateMatchAction = functions.firestore
  .document('matches/{matchId}/actions/{actionId}')
  .onCreate(
    triggerOnce('onCreateMatchAction', async (snap, context) => {
      const newValue = snap.data()
      if (!newValue) return

      const matchId = context.params.matchId
      const actionId = context.params.actionId

      const matchAction = await matchActionRepository.fetchById(
        matchId,
        actionId,
      )
      const match = await matchRepository.fetchById(matchId)
      if (!matchAction || !match) {
        return
      }

      try {
        if (matchAction.userAction === 'ready') {
          await setUserReadyUseCase.execute(match, matchAction)
        }
      } catch (e) {
        console.error(e)
      }
    }),
  )

export default onCreateMatchAction
