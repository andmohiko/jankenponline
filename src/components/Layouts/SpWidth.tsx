import { FlexBox } from '~/components/Base/FlexBox'

type Props = {
  children: React.ReactNode
}

export const SpWidth = ({ children }: Props) => {
  return (
    <FlexBox>
      <div
        style={{
          width: '100%',
          maxWidth: 500,
        }}
      >
        {children}
      </div>
    </FlexBox>
  )
}
