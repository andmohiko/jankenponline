type Props = {
  children: React.ReactNode
  direction?: 'row' | 'column'
  justify?: string
  align?: string
  gap?: number
  px?: number
  py?: number
  pt?: number
  pr?: number
  pb?: number
  pl?: number
  mx?: number
  my?: number
  mt?: number
  mr?: number
  mb?: number
  ml?: number
}

export const FlexBox = ({
  children,
  direction = 'column',
  justify = 'center',
  align = 'center',
  gap = 0,
  px = 0,
  py = 0,
  pt = 0,
  pr = 0,
  pb = 0,
  pl = 0,
  mx = 0,
  my = 0,
  mt = 0,
  mr = 0,
  mb = 0,
  ml = 0,
}: Props) => (
  <div
    style={{
      display: 'flex',
      flexDirection: direction,
      justifyContent: justify,
      alignItems: align,
      gap,
      padding: `${pt || py}px ${pr || px}px ${pb || py}px ${pl || px}px`,
      margin: `${mt || my}mx ${mr || mx}mx ${mb || my}mx ${ml || mx}px`,
    }}
  >
    {children}
  </div>
)
