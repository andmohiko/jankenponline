import * as functions from 'firebase-functions'

import { db, serverTimestamp } from '../firebase'
import MatchRequestRepository from '../repositories/MatchRequestRepository'
import UserRepository from '../repositories/UserRepository'
import { triggerOnce } from '../utils/triggerOnce'

const userRepository = new UserRepository()
const matchRequestRepository = new MatchRequestRepository()

const onCreateMatchRequest = functions.firestore
  .document('matchRequests/{matchRequestId}')
  .onCreate(
    triggerOnce('onCreateMatchRequest', async (snap, context) => {
      const newValue = snap.data()
      if (!newValue) return

      const matchRequestId = context.params.matchRequestId
      console.log('matchRequestId', matchRequestId)

      try {
        const matchRequest = await matchRequestRepository.fetchById(
          matchRequestId,
        )
        if (!matchRequest) {
          return
        }

        // ステータスをマッチング中にする
        const batch = db.batch()
        userRepository.updateByBatch(batch, matchRequest.userId, {
          status: 'matching',
          updatedAt: serverTimestamp,
        })
        matchRequestRepository.updateByBatch(batch, matchRequestId, {
          status: 'searching',
          updatedAt: serverTimestamp,
        })

        await batch.commit()
      } catch (e) {
        console.error(e)
      }
    }),
  )

export default onCreateMatchRequest
