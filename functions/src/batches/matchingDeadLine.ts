import { addSeconds } from 'date-fns'
import * as functions from 'firebase-functions'

import {
  MatchRequestsCollection,
  matchingDeadlineSeconds,
} from '../entities/MatchRequest'
import { db } from '../firebase'
import { scheduleTime } from '../utils/date'

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
    const snapShot = await db
      .collection(MatchRequestsCollection)
      .where('createdAt', '>', start)
      .where('createdAt', '<', cancelMatchingTime)
      .where('status', '==', 'searching')
      .get()
    console.log(start, cancelMatchingTime, snapShot.docs.length)
    // await Promise.all(
    //   snapShot.docs.map(async (doc) => {
    //     const batch = db.batch()
    //     await cancelMatchingUseCase.execute(batch, doc)
    //     await batch.commit()
    //   }),
    // ).catch((error) => {
    //   console.error(error)
    // })
  })

export default scheduledMatchingDeadLine
