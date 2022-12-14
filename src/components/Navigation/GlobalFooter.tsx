/* eslint-disable @next/next/no-img-element */
import { FlexBox } from '~/components/Base/FlexBox'
import { User } from '~/entities/User'

type Props = {
  user: User
}

export const GlobalFooter = ({ user }: Props) => {
  return (
    <FlexBox
      direction="row"
      justify="space-around"
      align="center"
      style={{
        backgroundColor: '#dcd3f0',
        height: 40,
      }}
    >
      <div>ホーム</div>
      <div>戦績</div>
      <div>ランキング</div>
      <div>
        <img
          src={user.profileImageUrl}
          height={24}
          width={24}
          alt={user.username}
        />
      </div>
    </FlexBox>
  )
}
