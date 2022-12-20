import { Result } from '~/entities/Match'

type Props = {
  children: React.ReactNode
  result: Result
  size?: number
}

const colorWin = '#EF5350'
const colorLose = '#1E88E5'

export const ResultText = ({ children, result, size = 16 }: Props) => {
  if (result === 'win') {
    return (
      <p
        style={{
          color: colorWin,
          fontWeight: 'bold',
          fontSize: size,
        }}
      >
        {children}
      </p>
    )
  }
  return (
    <p
      style={{
        color: colorLose,
        fontWeight: 'bold',
        fontSize: size,
      }}
    >
      {children}
    </p>
  )
}
