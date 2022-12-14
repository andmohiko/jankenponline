/* eslint-disable @next/next/no-img-element */
import { ReactElement, ReactNode, useEffect } from 'react'

import { useRouter } from 'next/router'

import { FlexBox } from '~/components/Base/FlexBox'
import { PageHead } from '~/components/Base/Head'
import { SpWidth } from '~/components/Layouts/SpWidth'
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
              src={user?.profileImageUrl}
              height={24}
              width={24}
              alt={user?.username}
            />
          </FlexBox>
          <FlexBox px={16} py={16}>
            {children}
          </FlexBox>
        </div>
      </SpWidth>
    </>
  )
}
