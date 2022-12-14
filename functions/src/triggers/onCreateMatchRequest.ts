import * as functions from 'firebase-functions'

import { triggerOnce } from '../utils/triggerOnce'

const onCreateMatchRequest = functions.firestore
  .document('matchRequests/{matchRequestId}')
  .onCreate(
    triggerOnce('onCreateMatchRequest', async (snap, context) => {
      const newValue = snap.data()
      if (!newValue) return

      const matchRequestId = context.params.matchRequestId

      try {
        console.log('matchRequestId', matchRequestId)
      } catch (e) {
        console.error(e)
      }
    }),
  )

export default onCreateMatchRequest
