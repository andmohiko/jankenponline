import { FlexBox } from '~/components/Base/FlexBox'
import { JankenHandIcon } from '~/components/JankenHandIcon'
import { JankenHand } from '~/entities'

type Props = {
  current: JankenHand | null
  select: (hand: JankenHand) => void
}

export const JankenButtons = ({ current = null, select }: Props) => {
  return (
    <FlexBox direction="row" gap={40}>
      <button onClick={() => select('rock')}>
        <JankenHandIcon hand="rock" isSelected={current === 'rock'} size={32} />
      </button>
      <button onClick={() => select('scissors')}>
        <JankenHandIcon
          hand="scissors"
          isSelected={current === 'scissors'}
          size={32}
        />
      </button>
      <button onClick={() => select('paper')}>
        <JankenHandIcon
          hand="paper"
          isSelected={current === 'paper'}
          size={32}
        />
      </button>
    </FlexBox>
  )
}
