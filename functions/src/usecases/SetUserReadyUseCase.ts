import { Match, MatchUser } from '../entities/Match'
import { MatchAction } from '../entities/MatchAction'
import { serverTimestamp } from '../firebase'
import MatchRepository from '../repositories/MatchRepository'

export default class SetUserReadyUseCase {
  matchRepository: MatchRepository

  constructor() {
    this.matchRepository = new MatchRepository()
  }

  async execute(match: Match, matchAction: MatchAction) {
    const users: MatchUser[] = match.users.map((user) => {
      if (user.userId !== matchAction.userId) {
        return user
      }
      return {
        ...user,
        actionStatus: 'ready',
      }
    })
    const isBothReady =
      users.filter((user) => user.actionStatus === 'ready').length === 2
    await this.matchRepository.update(match.matchId, {
      status: isBothReady ? 'fighting' : 'preparing',
      updatedAt: serverTimestamp,
      users,
    })
  }
}
