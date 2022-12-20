import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from '@firebase/auth'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'

import type { User } from '@firebase/auth'

import { UidState } from '~/atoms/states'
import { DefaultIconUrl } from '~/entities/User'
import { auth, serverTimestamp } from '~/lib/firebase'
import UserRepository from '~/repositories/UserRepository'

export const useAuth = () => {
  const { push } = useRouter()
  const [uid, setUid] = useRecoilState(UidState)
  const userRepository = new UserRepository()

  const getCurrentUser = async () => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        return push('/new')
      }
      setUid(user.uid)
    })
  }

  const googleLogin = async () => {
    const googleProvider = new GoogleAuthProvider()
    signInWithPopup(auth, googleProvider)
      .then(async (val) => {
        const userData = val.user
        const uid = userData.uid
        setUid(uid)

        const isUser = await userRepository.isExists(uid)

        if (!isUser) {
          await userRepository.create(uid, {
            createdAt: serverTimestamp,
            profileImageUrl: userData.photoURL ?? DefaultIconUrl,
            rating: 1500,
            seasonLoses: 0,
            seasonWins: 0,
            status: 'initial',
            totalLoses: 0,
            totalWins: 0,
            updatedAt: serverTimestamp,
            username: getInitialUsername(userData),
          })
        }

        push('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return {
    getCurrentUser,
    googleLogin,
  }
}

export const getInitialUsername = (userData: User) => {
  if (userData.displayName) {
    return userData.displayName
  }
  if (userData.email) {
    return userData.email.split('@')[0]
  }
  return userData.uid
}
