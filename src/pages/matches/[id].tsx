import { useState } from 'react'

import type { NextPage } from 'next'

import { FlexBox } from '~/components/Base/FlexBox'
import { BaseButton } from '~/components/Buttons/BaseButton'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { useUserState } from '~/hooks/useUserState'
import MatchRequestRepository from '~/usecases/StartMatchingUseCase'

const matchRequestRepository = new MatchRequestRepository()

const Match: NextPage = () => {
  const [user] = useUserState()
  const [loading, setLoading] = useState(false)

  return (
    <DefaultLayout isShowBack>
      <FlexBox
        gap={20}
        style={{
          width: 120,
        }}
      >
        まっちしたよ〜
      </FlexBox>
    </DefaultLayout>
  )
}

export default Match
