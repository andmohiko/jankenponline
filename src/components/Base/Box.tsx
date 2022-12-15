type Props = {
  children?: React.ReactNode
  width?: number | string
  height?: number | string
  style?: Record<string, string | number>
}

export const Box = ({
  children,
  width = '100%',
  height = '100%',
  style = {},
  ...props
}: Props) => (
  <div
    style={{
      width,
      height,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
)
