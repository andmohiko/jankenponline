import { ReactElement, ReactNode, useEffect } from 'react'

import { useRouter } from 'next/router'

import { FlexBox } from '~/components/FlexBox'
import { PageHead } from '~/components/Head'
import { SpWidth } from '~/components/Layouts/SpWidth'

type Props = {
  children?: ReactNode
}

export const DefaultLayout = ({ children }: Props): ReactElement => {
  const { push } = useRouter()
  const user = '1'

  useEffect(() => {
    if (!user) {
      push('/new')
    }
  }, [push])

  return (
    <>
      <PageHead />
      <SpWidth>
        <div
          style={{
            minHeight: '100vh',
          }}
        >
          <div
            style={{
              backgroundColor: '#dcd3f0',
              height: 40,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
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
          </div>
          <FlexBox px={16} py={16}>
            {children}
          </FlexBox>
        </div>
      </SpWidth>
    </>
  )
}
