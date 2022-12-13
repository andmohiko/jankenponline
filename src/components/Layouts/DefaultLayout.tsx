import { ReactElement, ReactNode, useEffect } from 'react'

import { useRouter } from 'next/router'

import { PageHead } from '~/components/Head'

type Props = {
  children?: ReactNode
}

export const DefaultLayout = ({ children }: Props): ReactElement => {
  const { push } = useRouter()
  const user = null

  useEffect(() => {
    if (!user) {
      push('/new')
    }
  }, [push])

  return (
    <div>
      <PageHead />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </div>
    </div>
  )
}
