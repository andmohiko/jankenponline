import { addSeconds } from 'date-fns'
import * as functions from 'firebase-functions'

import {
  MatchRequestsCollection,
  matchingDeadlineSeconds,
} from '../entities/MatchRequest'
import { db } from '../firebase'
import MatchRequestRepository from '../repositories/MatchRequestRepository'
import CancelMatchingUseCase from '../usecases/CancelMatchingUseCase'
import { scheduleTime } from '../utils/date'

const cancelMatchingUseCase = new CancelMatchingUseCase()
const matchRequestRepository = new MatchRequestRepository()

/**
 * 毎分実行、マッチング終了処理を行う
 */
const scheduledMatchingDeadLine = functions.pubsub
  .schedule(scheduleTime)
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    const nowDate = new Date()
    const start = addSeconds(nowDate, -60 * 60)
    const cancelMatchingTime = addSeconds(nowDate, -matchingDeadlineSeconds)
    const unmatchedRequests =
      await matchRequestRepository.fetchByMatchingDeadline(
        start,
        cancelMatchingTime,
      )
    console.log(start, cancelMatchingTime, unmatchedRequests.length)

    try {
      const batch = db.batch()

      // TODO: ここでもマッチングさせる
      for (let i = 0; i < unmatchedRequests.length; i++) {
        await cancelMatchingUseCase.execute(batch, unmatchedRequests[i])
      }

      await batch.commit()
    } catch (error) {
      console.error(error)
    }
  })

export default scheduledMatchingDeadLine
