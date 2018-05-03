import React from 'react'
import { connect } from 'react-redux'
import { authHOC } from './authHOC.jsx'

const AuthWidget = authHOC(
  ({auth}) => {
    return (
      auth.user
        ? <div onClick={auth.signOut}>
            { auth.user.email }
          </div>
        : <div onClick={auth.signIn}>
            SIGN IN
          </div>
    )
  }
)

export { AuthWidget }
