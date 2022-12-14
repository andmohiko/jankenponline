import type { NextPage } from 'next'

import { FlexBox } from '~/components/Base/FlexBox'
import { LinkButton } from '~/components/Buttons/LinkButton'
import { SimpleLayout } from '~/components/Layouts/SimpleLayout'

const NewPage: NextPage = () => {
  return (
    <SimpleLayout>
      <FlexBox gap={16}>
        <h1>じゃんけんポンライン</h1>
        <LinkButton href="/login">登録する</LinkButton>
      </FlexBox>
    </SimpleLayout>
  )
}

export default NewPage
