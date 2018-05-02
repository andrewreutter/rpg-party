import React from 'react'
import { connect } from 'react-redux'

const AuthWidget = connect(
  (state, ownProps) => ({
    user: state.auth.user,
    signOut: () => {
      state.auth.firebase.auth().signOut()
    },
    signIn: () => {
      state.auth.firebase.auth().signInWithPopup(state.auth.provider)
      .catch(function(error) {
      })
    }
  })
)(
  ({user, signIn, signOut}) => {
    return (
      user
        ? <div onClick={signOut}>
            { user.email }
          </div>
        : <div onClick={signIn}>
            SIGN IN
          </div>
    )
  }
)

export { AuthWidget }
