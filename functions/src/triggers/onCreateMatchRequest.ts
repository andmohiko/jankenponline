import * as functions from 'firebase-functions'

import { db, serverTimestamp } from '../firebase'
import MatchRequestRepository from '../repositories/MatchRequestRepository'
import UserRepository from '../repositories/UserRepository'
import MatchUsersUseCase from '../usecases/MatchUsersUseCase'
import { triggerOnce } from '../utils/triggerOnce'

const userRepository = new UserRepository()
const matchRequestRepository = new MatchRequestRepository()
const matchUsersUseCase = new MatchUsersUseCase()

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

        const batch = db.batch()
        // マッチできる人がいればマッチする
        const matchRequests = await matchRequestRepository.fetchSearching()
        if (matchRequests.length > 0) {
          // TODO: 探すロジックの精度を上げる
          const opponentRequest = matchRequests[0]

          await matchUsersUseCase.execute(
            batch,
            {
              profileImageUrl: matchRequest.profileImageUrl,
              rating: matchRequest.rating,
              userId: matchRequest.userId,
              username: matchRequest.username,
            },
            {
              profileImageUrl: opponentRequest.profileImageUrl,
              rating: opponentRequest.rating,
              userId: opponentRequest.userId,
              username: opponentRequest.username,
            },
            'gachi',
            0,
          )
        } else {
          // マッチできる人がいなければステータスをマッチング中にする
          userRepository.updateByBatch(batch, matchRequest.userId, {
            status: 'matching',
            updatedAt: serverTimestamp,
          })
          matchRequestRepository.updateByBatch(batch, matchRequestId, {
            status: 'searching',
            updatedAt: serverTimestamp,
          })
        }

        await batch.commit()
      } catch (e) {
        console.error(e)
      }
    }),
  )

export default onCreateMatchRequest
