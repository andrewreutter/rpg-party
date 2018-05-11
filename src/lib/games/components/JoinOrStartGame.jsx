import React from 'react'
import { connect } from 'react-redux'
import { firebaseConnect } from '../../firedux.jsx'
import { StartGame } from './StartGame.jsx'
import { JoinGame } from './JoinGame.jsx'
import { UserWidgets } from '../../auth/components/UserWidget'

const JoinOrStartGame = connect(
  (state, ownProps) => ({ hasCurrentGame:state.hasCurrentGame })
)(
  ({hasCurrentGame}) => hasCurrentGame ? <JoinScreen/> : <StartScreen/>
)
JoinOrStartGame.defaultProps = {}

const JoinScreen = firebaseConnect(
  (state, ownProps) => state.currentGame,
  (fireState, ownProps) => ({currentGame:fireState}),
  (fireRef, ownProps) => ({}),
)(
  ({currentGame}) => (
    <div className="JoinOrStartGame">
      <header className="App-header">
        <h1 className="App-title">
          { currentGame.name }
        </h1>
      </header>
      <h1>
        Join us at
        <br/>
        {''+document.location}
      </h1>
      <JoinGame game={currentGame}/>
      <UserWidgets users={currentGame.users || []}/>
    </div>
  )
)
JoinScreen.defaultProps = {}

const StartScreen = connect(
  (state, ownProps) => ({ currentGame:state.currentGame })
)(
  ({currentGame}) => (
    <div>
      <header className="App-header">
        <h1 className="App-title">
          Start or Join a Game
        </h1>
      </header>
      <StartGame/>
    </div>
  )
)
StartScreen.defaultProps = {}

export { JoinOrStartGame }
