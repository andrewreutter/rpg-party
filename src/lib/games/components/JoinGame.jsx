import React from 'react'

import { BigButton } from '../../ui/components/Buttons'
import { firebaseConnect } from '../../firedux.jsx'
import { authHOC } from '../../auth/components/authHOC.jsx'
import { authedClickHOC } from '../../auth/components/authedClickHOC.jsx'

const withGame = Component => authHOC(
  firebaseConnect(
    (state, ownProps) => state.currentGame,
    (fireState, ownProps) => ({
      game:fireState
    }),
    (fireRef, ownProps) => ({
      join: (game) => {
        const user = window.store.getState().auth.user // TODO: ICK! But data was stale in ownProps.auth.user
        game.users = (game.users || []).concat([user])
        // console.log('JGXXX', {game, user, fireRef})
        fireRef.set(game)
      }
    })
  )(Component)
)

const AuthedClickBigButton = authedClickHOC(
  ({onClick, ...rest}) => <BigButton onClick={onClick} {...rest}/>
)

const JoinGame = withGame(
  ({game, join}) => ( game &&
    <AuthedClickBigButton onClick={()=>join(game)}>
      JOIN {game.name}
    </AuthedClickBigButton>
  )
)
JoinGame.defaultProps = {}

export { JoinGame }
