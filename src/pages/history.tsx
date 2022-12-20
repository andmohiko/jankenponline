import { useEffect, useState } from 'react'

import type { NextPage } from 'next'

import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { MatchesTable } from '~/components/Tables/MatchesTable'
import { JoinMatch } from '~/entities/JoinMatch'
import { useUserState } from '~/hooks/useUserState'
import FetchLatestJoinMatchesUseCase from '~/usecases/FetchLatestJoinMatchesUseCase'

const fetchLatestJoinMatchesUseCase = new FetchLatestJoinMatchesUseCase()

const HistoryPage: NextPage = () => {
  const [user] = useUserState()
  const [matches, setMatches] = useState<Array<JoinMatch>>()

  useEffect(() => {
    const func = async () => {
      if (user?.userId) {
        const data = await fetchLatestJoinMatchesUseCase.execute(user.userId)
        setMatches(data)
      }
    }
    func()
  }, [user])

  return (
    <DefaultLayout>
      {matches && <MatchesTable matches={matches} />}
    </DefaultLayout>
  )
}

export default HistoryPage
