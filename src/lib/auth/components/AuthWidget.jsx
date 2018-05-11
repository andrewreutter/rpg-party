import React from 'react'
import { authHOC } from './authHOC.jsx'

const AuthWidget = authHOC(
  ({auth}) => {
    return (
      auth.user
        ? <div className="AuthWidget" onClick={auth.signOut}>
            { auth.user.email }
          </div>
        : <div className="AuthWidget" onClick={auth.signIn}>
            SIGN IN
          </div>
    )
  }
)

export { AuthWidget }
