import { Button } from '@chakra-ui/react'

type ButtonImportance = 'primary' | 'secondary' | 'tertiary'

type Props = {
  children: React.ReactNode
  onClick: () => void
  importance?: ButtonImportance
  loading?: boolean
}
export const BaseButton = ({
  children,
  onClick,
  importance = 'primary',
  loading = false,
}: Props) => {
  const variants = (importance: ButtonImportance) => {
    if (importance === 'secondary') {
      return 'outline'
    }
    if (importance === 'tertiary') {
      return 'ghost'
    }
    return 'solid'
  }
  return (
    <Button
      colorScheme="blue"
      variant={variants(importance)}
      onClick={onClick}
      isLoading={loading}
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
