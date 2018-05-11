import React from 'react'
import { connect } from 'react-redux'
import { BigButton } from '../../ui/components/Buttons'
import { authedClickHOC } from '../../auth/components/authedClickHOC.jsx'

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
    <AuthedClickBigButton onClick={()=>start({name:'My Game'})}>
      START Game
    </AuthedClickBigButton>
  )
)

const AuthedClickBigButton = authedClickHOC(
  ({onClick, ...rest}) => <BigButton onClick={onClick} {...rest}/>
)

export { StartGame }
