import { Context } from '@nuxt/types'
import SubscribeUserUseCase from '~/usecases/SubscribeUserUseCase'

const subscribeUserUseCase = new SubscribeUserUseCase()

export default async function ({ store, redirect }: Context) {
  try {
    const uid = 'andmohiko'
    if (!uid) {
      return redirect('/new')
    }
    await subscribeUserUseCase.execute(store, uid)
  } catch (error) {
    console.error(error)
  }
}
