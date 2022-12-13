import { ReactElement, ReactNode } from 'react'

import { FlexBox } from '~/components/FlexBox'
import { PageHead } from '~/components/Head'
import { SpWidth } from '~/components/Layouts/SpWidth'

type Props = {
  children?: ReactNode
}

export const SimpleLayout = ({ children }: Props): ReactElement => (
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
