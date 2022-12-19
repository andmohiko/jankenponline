import * as functions from 'firebase-functions'

import { db } from '../firebase'
import MatchRepository from '../repositories/MatchRepository'
import ThrowRepository from '../repositories/ThrowRepository'
import CalcRatingUseCase from '../usecases/CalcRatingUseCase'
import JudgeTurnResultUseCase from '../usecases/JudgeTurnResultUseCase'
import SetUserThrowedUseCase from '../usecases/SetUserThrowedUseCase'
import TurnEndingUseCase from '../usecases/TurnEndingUseCase'
import { triggerOnce } from '../utils/triggerOnce'

const throwRepository = new ThrowRepository()
const matchRepository = new MatchRepository()
const setUserThrowedUseCase = new SetUserThrowedUseCase()
const judgeTurnResultUseCase = new JudgeTurnResultUseCase()
const turnEndingUseCase = new TurnEndingUseCase()
const calcRatingUseCase = new CalcRatingUseCase()

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
        // 手を出したユーザーのステータスをthrowedに更新する
        const matchUsers = await setUserThrowedUseCase.execute(
          match,
          throwedHand,
        )
        const bothThrowed =
          matchUsers.filter((u) => u.actionStatus === 'throwed').length === 2
        if (!bothThrowed) {
          return
        }

        // 2人とも手を出していたとき
        const batch = db.batch()
        // ターンの結果を出す
        const turnResult = await judgeTurnResultUseCase.execute(batch, match)
        console.log('tr', turnResult)
        if (!turnResult) {
          return
        }

        // ターン終了の処理: 試合の続行の判定
        const turnExitStatus = turnEndingUseCase.execute(
          batch,
          match,
          turnResult,
        )

        // 試合終了のときはレート計算する
        if (turnExitStatus.status === 'finish') {
          calcRatingUseCase.execute(batch, match, turnExitStatus)
        }

        await batch.commit()
      } catch (e) {
        console.error(e)
      }
    }),
  )

export default onCreateThrow
