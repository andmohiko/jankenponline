import { Match } from '~/entities/Match'
import { UserId } from '~/entities/User'
import { serverTimestamp } from '~/lib/firebase'
import MatchActionRepository from '~/repositories/MatchActionRepository'

export default class ReadyForMatchUseCase {
  matchActionRepository: MatchActionRepository

  constructor() {
    this.matchActionRepository = new MatchActionRepository()
  }

  async execute(match: Match, userId: UserId) {
    this.matchActionRepository.create(match.matchId, {
      createdAt: serverTimestamp,
      userAction: 'ready',
      userId: userId,
    })
  }
}
