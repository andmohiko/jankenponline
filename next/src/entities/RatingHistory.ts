import { FieldValue } from 'firebase/firestore'

import { DocId } from '~/entities/index'

export type RatingHistoryId = DocId

export type RatingHistory = {
  ratingHistoryId: RatingHistoryId
  createdAt: FieldValue
  fluctuation: number
}
