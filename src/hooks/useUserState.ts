import { useCallback } from 'react'

import { useRecoilState } from 'recoil'

import { UserState } from '~/atoms/states'
import { User, AuthId } from '~/entities/User'
import UserRepository from '~/repositories/UserRepository'

const userRepository = new UserRepository()

export const useUserState = (): [
  User,
  (newUserId: AuthId) => Promise<void>,
] => {
  const [user, setUser] = useRecoilState(UserState)

  const subscribeUser = useCallback(
    async (newUserId?: AuthId) => {
      const userId = newUserId || user?.userId
      if (userId) {
        await userRepository.subscribeMe(userId, setUser)
      }
    },
    [user, setUser],
  )
  return [user, subscribeUser]
}
