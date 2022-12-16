import { useMemo, useState } from 'react'

import { JankenButtons } from './Buttons/JankenButtons'

import { FlexBox } from '~/components/Base/FlexBox'
import { BaseButton } from '~/components/Buttons/BaseButton'
import { MatchPlayerCard } from '~/components/Cards/MatchPlayerCard'
import { JankenHand } from '~/entities'
import { Match, MatchStatusLabel } from '~/entities/Match'
import { User } from '~/entities/User'
import ReadyForMatchUseCase from '~/usecases/ReadyForMatchUseCase'

const readyForMatchUseCase = new ReadyForMatchUseCase()

type Props = {
  user: User
  match: Match
}

export const BattleField = ({ match, user }: Props) => {
  const [currentHand, setCurrentHand] = useState<JankenHand | null>(null)
  const me = useMemo(() => {
    return match.users.find((u) => u.userId === user.userId)!
  }, [user, match])

  const opponent = useMemo(() => {
    return match.users.find((u) => u.userId !== user.userId)!
  }, [user, match])

  const readyForMatch = async () => {
    await readyForMatchUseCase.execute(match, me.userId)
  }

  const selectHand = (hand: JankenHand) => {
    currentHand === hand ? setCurrentHand(null) : setCurrentHand(hand)
  }

  return (
    <FlexBox
      justify="space-between"
      gap={20}
      px={4}
      style={{
        flexGrow: 1,
      }}
    >
      <MatchPlayerCard user={opponent} />
      {match?.matchId}
      {MatchStatusLabel[match.status]}
      <JankenButtons current={currentHand} select={selectHand} />
      {me.actionStatus === 'preparing' && (
        <BaseButton onClick={readyForMatch}>準備完了</BaseButton>
      )}
      <MatchPlayerCard user={me} />
    </FlexBox>
  )
}
