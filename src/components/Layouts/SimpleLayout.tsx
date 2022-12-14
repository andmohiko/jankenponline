import { ReactElement, ReactNode } from 'react'

import { FlexBox } from '~/components/Base/FlexBox'
import { PageHead } from '~/components/Base/Head'
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
