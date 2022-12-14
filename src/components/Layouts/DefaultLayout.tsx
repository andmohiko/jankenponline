import { ReactElement, ReactNode, useEffect } from 'react'

import { useRouter } from 'next/router'

import { FlexBox } from '~/components/Base/FlexBox'
import { PageHead } from '~/components/Base/Head'
import { SpWidth } from '~/components/Layouts/SpWidth'
import { useUserState } from '~/hooks/useUserState'

type Props = {
  children?: ReactNode
}

export const DefaultLayout = ({ children }: Props): ReactElement => {
  const { push } = useRouter()
  const [user, setUser] = useUserState()

  setUser({
    createdAt: new Date(),
    currentMatch: null,
    profileImageUrl:
      'https://pbs.twimg.com/profile_images/1560882765863608320/pAVy4uJ2_400x400.jpg',
    rating: 1500,
    userId: 'andmohiko',
    username: 'いとう',
    updatedAt: new Date(),
  })

  useEffect(() => {
    if (!user) {
      push('/new')
    }
  }, [user, push])

  return (
    <>
      <PageHead />
      <SpWidth>
        <div
          style={{
            minHeight: '100vh',
          }}
        >
          <FlexBox
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
          </FlexBox>
          <FlexBox px={16} py={16}>
            {children}
          </FlexBox>
        </div>
      </SpWidth>
    </>
  )
}
