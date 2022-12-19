import { GoogleAuthProvider, signInWithPopup, User } from '@firebase/auth'
import { useRouter } from 'next/router'

import { DefaultIconUrl } from '~/entities/User'
import { auth, serverTimestamp } from '~/lib/firebase'
import UserRepository from '~/repositories/UserRepository'

export const useAuth = () => {
  const { push } = useRouter()
  const userRepository = new UserRepository()

  const googleLogin = async () => {
    const googleProvider = new GoogleAuthProvider()
    signInWithPopup(auth, googleProvider)
      .then(async (val) => {
        const userData = val.user
        const uid = userData.uid

        const isUser = await userRepository.isExists(uid)

        if (!isUser) {
          await userRepository.create(uid, {
            createdAt: serverTimestamp,
            profileImageUrl: userData.photoURL ?? DefaultIconUrl,
            rating: 1500,
            status: 'initial',
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
