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
        console.log('len', matchRequests.length)
        if (matchRequests.length > 0) {
          // TODO: 探すロジックの精度を上げる
          const opponentRequest = matchRequests.filter(
            (mr) => mr.userId !== matchRequest.userId,
          )[0]

          await matchUsersUseCase.execute(
            batch,
            matchRequest,
            opponentRequest,
            'gachi',
            0,
          )
        } else {
          // マッチできる人がいなければステータスをマッチング中にする
          userRepository.updateByBatch(batch, matchRequest.userId, {
            status: 'matching',
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
