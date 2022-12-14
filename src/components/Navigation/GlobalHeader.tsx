/* eslint-disable @next/next/no-img-element */
import { FlexBox } from '~/components/Base/FlexBox'
import { User } from '~/entities/User'

type Props = {
  user: User
}

export const GlobalHeader = ({ user }: Props) => {
  return (
    <footer>
      <FlexBox
        direction="row"
        justify="center"
        align="center"
        style={{
          backgroundColor: '#dcd3f0',
          height: 40,
        }}
      >
        <h1
          style={{
            color: '#111111',
            fontSize: 20,
          }}
        >
          じゃんけんポンライン
        </h1>
        <img
          src={user.profileImageUrl}
          height={24}
          width={24}
          alt={user.username}
        />
      </FlexBox>
    </footer>
  )
}
