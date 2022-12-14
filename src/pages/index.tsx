import { useState } from 'react'

import type { NextPage } from 'next'

import { FlexBox } from '~/components/Base/FlexBox'
import { BaseButton } from '~/components/Buttons/BaseButton'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { useUserState } from '~/hooks/useUserState'
import StartMatchingUseCase from '~/usecases/StartMatchingUseCase'

const startMatchingUseCase = new StartMatchingUseCase()

const Home: NextPage = () => {
  const [user] = useUserState()
  const [loading, setLoading] = useState(false)

  const startMatching = () => {
    console.log('matching start')
    startMatchingUseCase.execute(user!)
    setLoading(true)
  }

  const cancel = () => {
    setLoading(false)
  }

  return (
    <DefaultLayout>
      <FlexBox
        gap={20}
        style={{
          width: 120,
        }}
      >
        <BaseButton onClick={startMatching} loading={loading}>
          対戦する
        </BaseButton>
        <BaseButton onClick={cancel} importance="secondary">
          キャンセル
        </BaseButton>
      </FlexBox>
      {user?.currentMatch && <a>マッチしたよ</a>}
    </DefaultLayout>
  )
}

export default Home
