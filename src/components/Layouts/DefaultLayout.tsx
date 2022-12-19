import { ReactElement, ReactNode, useEffect } from 'react'

import { useRecoilState } from 'recoil'

import { UidState } from '~/atoms/states'
import { FlexBox } from '~/components/Base/FlexBox'
import { PageHead } from '~/components/Base/Head'
import { LoadingScreen } from '~/components/Base/Loading'
import { SpWidth } from '~/components/Layouts/SpWidth'
import { GlobalFooter } from '~/components/Navigation/GlobalFooter'
import { GlobalHeader } from '~/components/Navigation/GlobalHeader'
import { useAuth } from '~/hooks/useAuth'
import { useUserState } from '~/hooks/useUserState'

type Props = {
  children: ReactNode
  isShowBack?: boolean
}

export const DefaultLayout = ({
  children,
  isShowBack = false,
}: Props): ReactElement => {
  const { getCurrentUser } = useAuth()
  const [user, subscribeUser] = useUserState()
  const [uid] = useRecoilState(UidState)

  useEffect(() => {
    getCurrentUser()
    subscribeUser(uid)
  }, [uid])

  if (user === undefined) {
    return <LoadingScreen />
  }

  return (
    <>
      <PageHead />
      <SpWidth>
        <div
          style={{
            minHeight: '100vh',
          }}
        >
          <GlobalHeader isShowBack={isShowBack} />
          <FlexBox
            px={16}
            py={16}
            style={{
              minHeight: 'calc(100vh - 110px)',
            }}
          >
            {children}
          </FlexBox>
          <GlobalFooter user={user!} />
        </div>
      </SpWidth>
    </>
  )
}
