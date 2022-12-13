import { FlexBox } from '~/components/FlexBox'

type Props = {
  children: React.ReactNode
}

export const SpWidth = ({ children }: Props) => {
  return (
    <FlexBox>
      <div
        style={{
          width: 500,
          maxWidth: 500,
        }}
      >
        {children}
      </div>
    </FlexBox>
  )
}
