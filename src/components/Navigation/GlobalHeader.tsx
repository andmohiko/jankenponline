import { useRouter } from 'next/router'
import { IoChevronBackOutline } from 'react-icons/io5'

import { Box } from '../Base/Box'

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
        <Box width={40}>
          {isShowBack && (
            <button onClick={back}>
              <IoChevronBackOutline color="#ffffff" size={32} />
            </button>
          )}
        </Box>
        <h1
          style={{
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: 20,
          }}
        >
          {title}
        </h1>
        <Box width={40}></Box>
      </FlexBox>
    </header>
  )
}
