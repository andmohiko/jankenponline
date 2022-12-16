import { useRouter } from 'next/router'
import { IoChevronBackOutline } from 'react-icons/io5'

import { FlexBox } from '~/components/Base/FlexBox'

type Props = {
  title?: string
  isShowBack: boolean
}

export const GlobalHeader = ({
  title = 'じゃんけんポンライン',
  isShowBack,
}: Props) => {
  const { back } = useRouter()
  return (
    <header>
      <FlexBox
        direction="row"
        justify="space-between"
        align="center"
        style={{
          backgroundColor: '#3182ce',
          height: 50,
        }}
      >
        <FlexBox
          width={40}
          style={{
            marginLeft: 4,
          }}
        >
          {isShowBack && (
            <button onClick={back}>
              <IoChevronBackOutline color="#ffffff" size={32} />
            </button>
          )}
        </FlexBox>
        <h1
          style={{
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: 20,
          }}
        >
          {title}
        </h1>
        <FlexBox width={40}></FlexBox>
      </FlexBox>
    </header>
  )
}
