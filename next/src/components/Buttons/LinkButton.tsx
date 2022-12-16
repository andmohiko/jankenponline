import { Button } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
  href: string
}
export const LinkButton = ({ children, href }: Props) => {
  return (
    <Button
      as={'a'}
      href={href}
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
