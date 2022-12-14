import { User } from '~/entities/User'
import { serverTimestamp } from '~/lib/firebase'
import MatchRequestRepository from '~/repositories/MatchRequestRepository'

export default class StartMatchingUseCase {
  matchRequestRepository: MatchRequestRepository

  constructor() {
    this.matchRequestRepository = new MatchRequestRepository()
  }

  async execute(user: User) {
    this.matchRequestRepository.create({
      createdAt: serverTimestamp,
      matchingDeadline: new Date(),
      profileImageUrl: user.profileImageUrl,
      rating: user.rating,
      status: 'searching',
      updatedAt: serverTimestamp,
      userId: user.userId,
      username: user.username,
    })
  }
}
