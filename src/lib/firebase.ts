import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import {
  serverTimestamp as getServerTimeStamp,
  getFirestore,
  connectFirestoreEmulator
} from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'
import { getRemoteConfig } from 'firebase/remote-config'
import { getStorage } from 'firebase/storage'

// import config from './firebaseConfig.json'

const firebaseApp = initializeApp({})

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)
const storage = getStorage()
const analitics = getAnalytics()
const serverTimestamp = getServerTimeStamp()
const googleProvider = new GoogleAuthProvider()
const functions = getFunctions()
const remoteConfig = getRemoteConfig()
remoteConfig.settings.minimumFetchIntervalMillis = 1000

if (process.env.USE_EMULATOR === 'true') {
  connectFirestoreEmulator(db, 'localhost', 8080)
}

export {
  db,
  auth,
  storage,
  analitics,
  serverTimestamp,
  googleProvider,
  functions,
  remoteConfig
}
