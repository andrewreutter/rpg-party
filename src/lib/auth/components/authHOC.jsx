import { connect } from 'react-redux'

const authHOC = connect(
  (state, ownProps) => (  {
    auth: {
      user: state.auth.user,
      isSignedIn: !!state.auth.user,
      signOut: () => (
        state.auth.firebase.auth().signOut()
      ),
      signIn: () => (
        state.auth.firebase.auth().signInWithPopup(state.auth.provider)
        .catch(function(error) {
          console.error('authHOC Error', error)
          // TODO: error handling
        })
      ),
    },
  })
)

export { authHOC }
