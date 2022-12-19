import type { NextPage } from 'next'

import { FlexBox } from '~/components/Base/FlexBox'
import { BaseButton } from '~/components/Buttons/BaseButton'
import { SimpleLayout } from '~/components/Layouts/SimpleLayout'
import { useAuth } from '~/hooks/useAuth'

const NewPage: NextPage = () => {
  const { googleLogin } = useAuth()
  return (
    <SimpleLayout>
      <FlexBox gap={16}>
        <h1>じゃんけんポンライン</h1>
        <BaseButton onClick={googleLogin}>Googleログインする</BaseButton>
      </FlexBox>
    </SimpleLayout>
  )
}

export default NewPage
