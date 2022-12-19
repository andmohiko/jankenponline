import { Throw } from '../entities/Throw'
import { Result } from '../entities/TurnResult'
import { UserId } from '../entities/User'

export type DocId = string

export type JankenHand = 'rock' | 'paper' | 'scissors'

const handsMeta: { [key in JankenHand]: JankenHand[] } = {
  rock: ['scissors'],
  scissors: ['paper'],
  paper: ['rock'],
}

export type JankenResult = {
  result: Result
  winner: UserId | null
  loser: UserId | null
}

export const getJankenResult = (throw1: Throw, throw2: Throw): JankenResult => {
  if (handsMeta[throw1.hand].includes(throw2.hand)) {
    return {
      result: 'settled',
      winner: throw1.userId,
      loser: throw2.userId,
    }
  }
  if (handsMeta[throw2.hand].includes(throw1.hand)) {
    return {
      result: 'settled',
      winner: throw2.userId,
      loser: throw1.userId,
    }
  }
  return {
    result: 'draw',
    winner: null,
    loser: null,
  }
}
