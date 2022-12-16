import { Match, MatchUser } from '../entities/Match'
import { MatchAction } from '../entities/MatchAction'
import { serverTimestamp } from '../firebase'
import JoinMatchRepository from '../repositories/JoinMatchRepository'
import MatchRepository from '../repositories/MatchRepository'
import MatchRequestRepository from '../repositories/MatchRequestRepository'
import UserRepository from '../repositories/UserRepository'

export default class SetUserReadyUseCase {
  joinMatchRepository: JoinMatchRepository
  matchRepository: MatchRepository
  matchRequestRepository: MatchRequestRepository
  userRepository: UserRepository

  constructor() {
    this.joinMatchRepository = new JoinMatchRepository()
    this.matchRepository = new MatchRepository()
    this.matchRequestRepository = new MatchRequestRepository()
    this.userRepository = new UserRepository()
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
