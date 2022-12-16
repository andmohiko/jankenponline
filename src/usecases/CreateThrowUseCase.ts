import { JankenHand } from '~/entities'
import { Match } from '~/entities/Match'
import { UserId } from '~/entities/User'
import { serverTimestamp } from '~/lib/firebase'
import ThrowRepository from '~/repositories/ThrowRepository'

export default class CreateThrowUseCase {
  throwRepository: ThrowRepository

  constructor() {
    this.throwRepository = new ThrowRepository()
  }

  async execute(
    match: Match,
    userId: UserId,
    hand: JankenHand,
    round: number,
    turn: number,
  ) {
    this.throwRepository.create(match.matchId, {
      createdAt: serverTimestamp,
      hand,
      round,
      turn,
      userId,
    })
  }
}
