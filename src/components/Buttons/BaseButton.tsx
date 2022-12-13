type Props = {
  children: React.ReactNode
  onClick: () => void
}
export const BaseButton = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 16px',
        backgroundColor: '#428BE6',
        border: 'none',
        borderRadius: 6,
        color: '#FFFFFF',
        fontSize: 16,
        lineHeight: 1.6,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}
