import { atom } from 'recoil'

import { MatchRequest } from '~/entities/MatchRequest'
import { User } from '~/entities/User'

export const UserState = atom<User | undefined>({
  key: 'user',
  default: undefined,
})

export const MatchRequestState = atom<MatchRequest | undefined>({
  key: 'matchRequest',
  default: undefined,
})
