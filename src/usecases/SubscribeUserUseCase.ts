import { Store } from 'vuex'

import { UserId } from '~/entities/User'
import UserRepository from '~/repositories/UserRepository'

export default class SubscribeUserUseCase {
  userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async execute(store: Store<any>, userId: UserId) {
    await this.userRepository.subscribeMe(userId)
  }
}
