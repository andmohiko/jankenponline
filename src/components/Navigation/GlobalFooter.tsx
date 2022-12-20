/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BiHistory } from 'react-icons/bi'
import { BsLightningCharge } from 'react-icons/bs'
import { MdOutlineLeaderboard } from 'react-icons/md'

import { FlexBox } from '~/components/Base/FlexBox'
import { User } from '~/entities/User'
const baseColor = '#777777'
const activeColor = '#ff00ff'

type Props = {
  user: User
}

export const GlobalFooter = ({ user }: Props) => {
  const { pathname } = useRouter()
  const color = (menuPath: string) => {
    return menuPath === pathname ? activeColor : baseColor
  }
  return (
    <FlexBox
      direction="row"
      justify="space-around"
      align="center"
      style={{
        backgroundColor: '#fcfcfc',
        boxShadow: '0px 10px 13px 0px rgba(0, 0, 0, 0.30)',
        height: 60,
        borderTop: '1px solid #eeeeee',
      }}
    >
      <NavLinkItem
        icon={<BsLightningCharge color={color('/')} size={20} />}
        href="/"
        label="ホーム"
        color={color('/')}
      />
      <NavLinkItem
        icon={<BiHistory color={color('/history')} size={24} />}
        href="/history"
        label="戦績"
        color={color('/history')}
      />
      <NavLinkItem
        icon={<MdOutlineLeaderboard color={color('/ranking')} size={24} />}
        href="/ranking"
        label="ランキング"
        color={color('/ranking')}
      />
      <NavLinkItem
        icon={
          <div
            style={{
              borderRadius: 24,
              overflow: 'hidden',
            }}
          >
            <img
              src={user.profileImageUrl}
              height={24}
              width={24}
              alt={user.username}
            />
          </div>
        }
        href="/mypage"
        label="マイページ"
        color={color('/mypage')}
      />
    </FlexBox>
  )
}

type NavLinkItemProps = {
  icon: React.ReactNode
  href: string
  label: string
  color: string
}

const NavLinkItem = ({ icon, href, label, color }: NavLinkItemProps) => {
  return (
    <Link href={href} passHref>
      <a>
        <FlexBox
          justify="center"
          align="center"
          gap={4}
          style={{
            width: 64,
            cursor: 'pointer',
          }}
        >
          {icon}
          <span
            style={{
              color,
              fontSize: 9,
              lineHeight: 1.5,
            }}
          >
            {label}
          </span>
        </FlexBox>
      </a>
    </Link>
  )
}
