import { useEffect, useState } from 'react'

import type { NextPage } from 'next'

import { FlexBox } from '~/components/Base/FlexBox'
import { MatchPlayerCard } from '~/components/Cards/MatchPlayerCard'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { useCurrentMatchState } from '~/hooks/useCurrentMatchState'
import { useUserState } from '~/hooks/useUserState'

const Match: NextPage = () => {
  const [user] = useUserState()
  const [currentMatch, refetchMatch] = useCurrentMatchState()
  const [loading, setLoading] = useState(false)

  // TODO: ページを開いたら現在のマッチを取得し、相手の情報を表示する
  useEffect(() => {
    if (user?.currentMatch) {
      refetchMatch(user.currentMatch)
    }
  }, [refetchMatch, user])

  // TODO: 準備完了ボタンを置いて、actionを作成する
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
