import { Match, MatchUser } from '../entities/Match'
import { Throw } from '../entities/Throw'
import { serverTimestamp } from '../firebase'
import MatchRepository from '../repositories/MatchRepository'

export default class SetUserThrowedUseCase {
  matchRepository: MatchRepository

  constructor() {
    this.matchRepository = new MatchRepository()
  }

  async execute(match: Match, throwedHand: Throw): Promise<Array<MatchUser>> {
    const users: MatchUser[] = match.users.map((user) => {
      if (user.userId !== throwedHand.userId) {
        return user
      }
      return {
        ...user,
        actionStatus: 'throwed',
      }
    })
    await this.matchRepository.update(match.matchId, {
      updatedAt: serverTimestamp,
      users,
    })
    return users
  }
}
