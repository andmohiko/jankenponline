import { useEffect } from 'react'

import type { NextPage } from 'next'

import { LoadingScreen } from '~/components/Base/Loading'
import { BattleField } from '~/components/BattleField'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { useCurrentMatchState } from '~/hooks/useCurrentMatchState'
import { useUserState } from '~/hooks/useUserState'

const MatchPage: NextPage = () => {
  const [user] = useUserState()
  const [currentMatch, refetchMatch] = useCurrentMatchState()

  useEffect(() => {
    if (user?.currentMatch) {
      refetchMatch(user.currentMatch)
    }
  }, [user])

  return (
    <DefaultLayout isShowBack>
      {currentMatch && user ? (
        <BattleField match={currentMatch} user={user} />
      ) : (
        <LoadingScreen />
      )}
    </DefaultLayout>
  )
}

export default MatchPage
