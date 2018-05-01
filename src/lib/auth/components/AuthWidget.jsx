import React from 'react'
import { connect } from 'react-redux'
import { setAuthUser } from '../actions.jsx'

const AuthWidget = connect(
  (state, ownProps) => ({
    auth: state.auth,
  }),
  (dispatch, ownProps) => ({
    setAuthUser: user => dispatch(setAuthUser(user))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    user: stateProps.auth.user,
    signOut: () => {
      stateProps.auth.firebase.auth().signOut()
    },
    signIn: () => {
      stateProps.auth.firebase.auth().signInWithPopup(stateProps.auth.provider)
      .catch(function(error) {
        // TODO: Error handling
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // var email = error.email;
        // var credential = error.credential; // The firebase.auth.AuthCredential type that was used.
      })
    },
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
