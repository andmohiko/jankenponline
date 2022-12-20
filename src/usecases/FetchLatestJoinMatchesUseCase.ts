import { UserId } from '~/entities/User'
import JoinMatchRepository from '~/repositories/JoinMatchRepository'

export default class FetchLatestJoinMatchesUseCase {
  joinMatchRepository: JoinMatchRepository

  constructor() {
    this.joinMatchRepository = new JoinMatchRepository()
  }

  async execute(userId: UserId) {
    const joinMatches = await this.joinMatchRepository.fetchLatest(userId)
    return joinMatches
  }
}
