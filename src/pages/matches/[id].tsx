import { useEffect, useState } from 'react'

import type { NextPage } from 'next'

import { FlexBox } from '~/components/Base/FlexBox'
import { LoadingScreen } from '~/components/Base/Loading'
import { BaseButton } from '~/components/Buttons/BaseButton'
import { MatchPlayerCard } from '~/components/Cards/MatchPlayerCard'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { useCurrentMatchState } from '~/hooks/useCurrentMatchState'
import { useUserState } from '~/hooks/useUserState'
import ReadyForMatchUseCase from '~/usecases/ReadyForMatchUseCase'

const readyForMatchUseCase = new ReadyForMatchUseCase()

const Match: NextPage = () => {
  const [user] = useUserState()
  const [currentMatch, refetchMatch] = useCurrentMatchState()
  const [loading, setLoading] = useState(false)

  // TODO: ページを開いたら現在のマッチを取得し、相手の情報を表示する
  useEffect(() => {
    console.log('useeffect')
    setLoading(true)
    if (user?.currentMatch) {
      refetchMatch(user.currentMatch)
      setLoading(false)
    }
    console.log('finish useeffect')
  }, [user])

  if (loading) {
    return <LoadingScreen />
  }

  // TODO: 準備完了ボタンを置いて、actionを作成する
  const readyForMatch = async () => {
    await readyForMatchUseCase.execute(currentMatch!, user!.userId)
  }
  // TODO: actionが作成されたらfunctionsでmatch.user.statusをreadyにする

  return (
    <DefaultLayout isShowBack>
      <FlexBox
        justify="space-between"
        gap={20}
        px={4}
        style={{
          flexGrow: 1,
        }}
      >
        {currentMatch?.users && (
          <MatchPlayerCard
            user={currentMatch.users.find((u) => u.userId !== user?.userId)!}
          />
        )}
        まっちしたよ〜
        {currentMatch?.matchId}
        <BaseButton onClick={readyForMatch}>準備完了</BaseButton>
        {currentMatch?.users && (
          <MatchPlayerCard
            user={currentMatch.users.find((u) => u.userId === user?.userId)!}
          />
        )}
      </FlexBox>
    </DefaultLayout>
  )
}

export default Match
