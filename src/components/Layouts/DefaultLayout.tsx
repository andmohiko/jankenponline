import { ReactElement, ReactNode, useEffect } from 'react'

import { useRouter } from 'next/router'

import { FlexBox } from '~/components/Base/FlexBox'
import { PageHead } from '~/components/Base/Head'
import { LoadingScreen } from '~/components/Base/Loading'
import { SpWidth } from '~/components/Layouts/SpWidth'
import { GlobalFooter } from '~/components/Navigation/GlobalFooter'
import { GlobalHeader } from '~/components/Navigation/GlobalHeader'
import { useUserState } from '~/hooks/useUserState'
import { request } from '~/lib/request'

type Props = {
  children?: ReactNode
}

export const DefaultLayout = ({ children }: Props): ReactElement => {
  const { push } = useRouter()
  const [user, setUser] = useUserState()

  useEffect(() => {
    request('/auth')
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Failed auth')
        }
        const { data } = await res.json()
        setUser(data)
      })
      .catch(() => {
        return push('/new')
      })
  }, [push, setUser])

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
          <GlobalHeader user={user!} />
          <FlexBox
            px={16}
            py={16}
            style={{
              minHeight: 'calc(100vh - 80px)',
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
