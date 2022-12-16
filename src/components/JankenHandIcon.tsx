import {
  FaRegHandRock,
  FaRegHandScissors,
  FaRegHandPaper,
} from 'react-icons/fa'

import { FlexBox } from '~/components/Base/FlexBox'

type Props = {
  hand: 'rock' | 'paper' | 'scissors'
  isSelected?: boolean
  size?: number
}

export const JankenHandIcon = ({
  hand,
  isSelected = false,
  size = 18,
}: Props) => {
  return (
    <FlexBox
      px={12}
      py={12}
      style={{
        backgroundColor: isSelected ? '#3182ce' : '',
        color: isSelected ? '#fff' : '',
        border: '1px solid rgba(100, 100, 111, 0.1)',
        borderRadius: '50%',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      }}
    >
      {hand === 'rock' && <FaRegHandRock size={size} />}
      {hand === 'paper' && <FaRegHandPaper size={size} />}
      {hand === 'scissors' && <FaRegHandScissors size={size} />}
    </FlexBox>
  )
}
