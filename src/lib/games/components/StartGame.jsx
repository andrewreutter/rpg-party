import React from 'react'
import { firebaseConnect } from '../../firedux.jsx'
import { BigButton } from '../../ui/components/Buttons'

const StartGame = firebaseConnect(
  (state, ownProps) => state.games,
  (fireState, ownProps) => ({games:fireState}),
  (fireRef, ownProps) => ({
    start: gameProps => fireRef.add({
      name: 'New Game',
      ...gameProps
    })
    .then(game=>{
      document.location = `/${game.path}`
    })
  })
)(
  ({games, start}) => (
    <BigButton onClick={()=>start({name:'My Game'})}>
      START Game #{games.length}
    </BigButton>
  )
)

export { StartGame }
