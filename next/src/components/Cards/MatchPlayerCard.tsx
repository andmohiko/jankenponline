import { Image } from '@chakra-ui/react'

import { FlexBox } from '~/components/Base/FlexBox'
import { ActionStatusLabel, MatchUser } from '~/entities/Match'

type Props = {
  user: MatchUser
}

export const MatchPlayerCard = ({ user }: Props) => {
  return (
    <FlexBox
      direction="row"
      px={16}
      py={16}
      gap={16}
      style={{
        borderRadius: 16,
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      }}
    >
      <FlexBox
        width={72}
        height={72}
        style={{
          flexShrink: 0,
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        <Image src={user.profileImageUrl} alt={user.username} />
      </FlexBox>
      <FlexBox align="flex-start">
        <span
          style={{
            fontSize: 24,
          }}
        >
          {user.username}
        </span>
        <span
          style={{
            fontSize: 13,
          }}
        >
          レーティング: {user.rating}
        </span>
      </FlexBox>
      <FlexBox>
        <span>{ActionStatusLabel[user.actionStatus]}</span>
      </FlexBox>
    </FlexBox>
  )
}
