import React from 'react'
import { connect } from 'react-redux'

import { BigButton } from '../../ui/components/Buttons'
import {firebaseConnect} from '../../firedux.jsx'
import { authHOC } from '../../auth/components/authHOC.jsx'
import { authedClickHOC } from '../../auth/components/authedClickHOC.jsx'

const addGame = firebaseConnect(
  (state, ownProps) => state.currentGame,
  (fireState, ownProps) => ({
    game:fireState
  }),
  (fireRef, ownProps) => ({
    join: (game, user) => {
      // const child = fireRef.collection('users')
      // child.add(user)
      game.users = (game.users || []).concat([user])
      // console.log('JGXXX', {game, user, fireRef})
      fireRef.set(game).then(res=>console.log('resXXX', game.users))
    } // TODO: something
  })
)

const AuthedClickBigButton = authedClickHOC(
  ({onClick, ...rest}) => (console.log({onClick, rest}), <BigButton onClick={onClick} {...rest}/>)
)

const JoinGame = authHOC(addGame(
  ({auth, game, join}) => ( game &&
    <AuthedClickBigButton onClick={()=>join(game, auth.user)}>
      JOIN {game.name}
    </AuthedClickBigButton>
  )
))
JoinGame.defaultProps = {}

export { JoinGame }
