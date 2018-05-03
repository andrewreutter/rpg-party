import { firebaseAuthReducer } from '../firedux.jsx'

let authReducer = null
const makeAuthReducer = (firebase, provider) => {
  return authReducer = firebaseAuthReducer(firebase, provider)
}

export { makeAuthReducer, authReducer }
