import { useRecoilState } from 'recoil'

import { UserState } from '~/atoms/states'
import { User, AuthId } from '~/entities/User'

export const useUserState = (): [User | undefined, any] => {
  const [user, setUser] = useRecoilState(UserState)
  // const { getMe } = useSenpaiExaminee()

  const refetchUser = async (newUserId?: AuthId) => {
    const userId = newUserId || user?.userId
    if (userId) {
      // const data = await getMe(userId)
      // setUser(data)
    }
  }
  return [user, setUser]
}
