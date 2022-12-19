import { atom } from 'recoil'

import { Match } from '~/entities/Match'
import { AuthId, User } from '~/entities/User'

export const UidState = atom<AuthId>({
  key: 'uid',
  default: undefined,
})

export const UserState = atom<User>({
  key: 'user',
  default: undefined,
})

export const CurrentMatchState = atom<Match | undefined>({
  key: 'currentMatch',
  default: undefined,
})
