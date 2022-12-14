import { Button } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}
export const LinkButton = ({ children }: Props) => {
  return (
    <Button
      as={'a'}
      colorScheme="blue"
      style={{
        padding: '8px 16px',
        borderRadius: 6,
        fontSize: 16,
        lineHeight: 1.6,
        width: '100%',
      }}
    >
      {children}
    </Button>
  )
}
