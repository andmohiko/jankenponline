import type { NextPage } from 'next'

import { BaseButton } from '~/components/Buttons/BaseButton'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { User } from '~/entities/User'
import MatchRequestRepository from '~/usecases/StartMatchingUseCase'

const matchRequestRepository = new MatchRequestRepository()

const Home: NextPage = () => {
  const user: User = {
    createdAt: new Date(),
    currentMatch: null,
    profileImageUrl:
      'https://pbs.twimg.com/profile_images/1560882765863608320/pAVy4uJ2_400x400.jpg',
    rating: 1500,
    userId: 'andmohiko',
    username: 'いとう',
    updatedAt: new Date(),
  }
  const startMatching = () => {
    console.log('matching start')
    matchRequestRepository.execute(user)
  }

  return (
    <DefaultLayout>
      <h1>テンプレート</h1>
      <p>だんらく</p>
      <span>すぱん</span>
      <span>すぱーん</span>
      <BaseButton onClick={startMatching}>対戦する</BaseButton>
    </DefaultLayout>
  )
}

export default Home
