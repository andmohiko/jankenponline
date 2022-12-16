import * as functions from 'firebase-functions'

import MatchRepository from '../repositories/MatchRepository'
import ThrowRepository from '../repositories/ThrowRepository'
import SetUserThrowedUseCase from '../usecases/SetUserThrowedUseCase'
import { triggerOnce } from '../utils/triggerOnce'

const throwRepository = new ThrowRepository()
const matchRepository = new MatchRepository()
const setUserThrowedUseCase = new SetUserThrowedUseCase()

const onCreateThrow = functions.firestore
  .document('matches/{matchId}/throws/{throwId}')
  .onCreate(
    triggerOnce('onCreateThrow', async (snap, context) => {
      const newValue = snap.data()
      if (!newValue) return

      const matchId = context.params.matchId
      const throwId = context.params.throwId

      const match = await matchRepository.fetchById(matchId)
      const throwedHand = await throwRepository.fetchById(matchId, throwId)
      if (!match || !throwedHand) {
        return
      }

      try {
        await setUserThrowedUseCase.execute(match, throwedHand)
      } catch (e) {
        console.error(e)
      }
    }),
  )

export default onCreateThrow
