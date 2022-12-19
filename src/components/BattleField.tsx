import { useMemo, useState } from 'react'

import { JankenButtons } from './Buttons/JankenButtons'

import { FlexBox } from '~/components/Base/FlexBox'
import { BaseButton } from '~/components/Buttons/BaseButton'
import { MatchPlayerCard } from '~/components/Cards/MatchPlayerCard'
import { JankenHand } from '~/entities'
import { Match, MatchStatusLabel } from '~/entities/Match'
import { User } from '~/entities/User'
import CreateThrowUseCase from '~/usecases/CreateThrowUseCase'
import ReadyForMatchUseCase from '~/usecases/ReadyForMatchUseCase'

const readyForMatchUseCase = new ReadyForMatchUseCase()
const createThrowUseCase = new CreateThrowUseCase()

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

  const createThrow = () => {
    if (!currentHand) {
      return
    }

    createThrowUseCase.execute(
      match,
      user.userId,
      currentHand,
      match.round,
      match.turn,
    )
    setCurrentHand(null)
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
      <FlexBox>
        <p>試合ID: {match?.matchId}</p>
        <p>試合ステータス: {MatchStatusLabel[match.status]}</p>
        <p>
          勝敗数: 自分 {me.wins} : 相手 {opponent.wins}
        </p>
        <p>ラウンド: {match.round}</p>
        <p>ターン: {match.turn}</p>
      </FlexBox>
      <FlexBox gap={20}>
        <JankenButtons current={currentHand} select={selectHand} />
        <BaseButton onClick={createThrow} disabled={!currentHand}>
          決定
        </BaseButton>
      </FlexBox>
      {me.actionStatus === 'preparing' && (
        <BaseButton onClick={readyForMatch}>準備完了</BaseButton>
      )}
      <MatchPlayerCard user={me} />
    </FlexBox>
  )
}
