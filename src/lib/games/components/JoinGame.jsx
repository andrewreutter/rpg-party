import React from 'react'
import { connect } from 'react-redux'

import { BigButton } from '../../ui/components/Buttons'
import {firebaseConnect} from '../../firedux.jsx'

const firebase = require("firebase");

const addUser = connect(
  (state, action) => ({
    user:state.auth.user
  })
)
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
      console.log('JGXXX', {game, user, fireRef})
      fireRef.set(game).then(res=>console.log('resXXX', res))
    } // TODO: something
  })
)

const JoinGame = addUser(addGame(
  ({user, game, join}) => ( game &&
    <BigButton onClick={()=>join(game, user)}>
      JOIN {game.name}
    </BigButton>
  )
))
JoinGame.defaultProps = {}

export { JoinGame }
