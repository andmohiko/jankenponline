export type Rating = number

const CLAMP_MIN = 2
const CLAMP_MAX = 31
const ELO_K = 32

const clamp = (point: number): number => {
  if (point < CLAMP_MIN) {
    return CLAMP_MIN
  } else if (CLAMP_MAX < point) {
    return CLAMP_MAX
  } else {
    return point
  }
}

export const calcRating = (winnerRate: Rating, loserRate: Rating): Rating => {
  const point = ELO_K / (10 ** ((winnerRate - loserRate) / 400) + 1)
  return clamp(point)
}
