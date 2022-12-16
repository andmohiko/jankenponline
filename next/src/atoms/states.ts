import { atom } from 'recoil'

import { Match } from '~/entities/Match'
import { User } from '~/entities/User'

export const UserState = atom<User | undefined>({
  key: 'user',
  default: undefined,
})

export const CurrentMatchState = atom<Match | undefined>({
  key: 'currentMatch',
  default: undefined,
})
