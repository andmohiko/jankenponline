import * as functions from 'firebase-functions'

import { MatchUser } from '../entities/Match'
import { serverTimestamp } from '../firebase'
import MatchRepository from '../repositories/MatchRepository'
import ThrowRepository from '../repositories/ThrowRepository'
import { triggerOnce } from '../utils/triggerOnce'

const throwRepository = new ThrowRepository()
const matchRepository = new MatchRepository()

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
      const userId = throwedHand.userId

      try {
        const users: MatchUser[] = match.users.map((user) => {
          if (user.userId !== userId) {
            return user
          }
          return {
            ...user,
            actionStatus: 'throwed',
          }
        })

        await matchRepository.update(matchId, {
          updatedAt: serverTimestamp,
          users,
        })
      } catch (e) {
        console.error(e)
      }
    }),
  )

export default onCreateThrow
