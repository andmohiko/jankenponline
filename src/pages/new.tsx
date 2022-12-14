import Link from 'next/link'

import type { NextPage } from 'next'

import { FlexBox } from '~/components/Base/FlexBox'
import { SimpleLayout } from '~/components/Layouts/SimpleLayout'

const NewPage: NextPage = () => {
  return (
    <SimpleLayout>
      <FlexBox gap={16}>
        <h1>じゃんけんポンライン</h1>
        <p>
          <Link href="login">ここから登録してね</Link>
        </p>
      </FlexBox>
    </SimpleLayout>
  )
}

export default NewPage
