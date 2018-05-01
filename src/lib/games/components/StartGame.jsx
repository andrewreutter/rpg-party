import React from 'react'
import { connect } from 'react-redux'
import { BigButton } from '../../ui/components/Buttons'

const StartGame = connect(
  (state, ownProps) => ({
    start: gameProps => state.gamesRef.add({
      name: 'New Game',
      ...gameProps
    })
    .then(game=>{
      document.location = `/${game.path}`
    })
  }),
)(
  ({start}) => (
    <BigButton onClick={()=>start({name:'My Game'})}>
      START Game
    </BigButton>
  )
)

export { StartGame }
