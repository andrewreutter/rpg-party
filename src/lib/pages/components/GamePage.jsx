import React from 'react'
import { firebaseConnect } from '../../firedux.jsx'
import './styles.css';

import { UserWidgets } from '../../auth/components/UserWidget'
import { JoinGame } from '../../games/components/JoinGame.jsx'
import { Page } from '../../ui/components/Page.jsx'
import { H1, H2, Content, Footer } from '../../ui/components/Headers.jsx'

const GamePage = firebaseConnect(
  (state, ownProps) => state.currentGame,
  (fireState, ownProps) => ({currentGame:fireState}),
  (fireRef, ownProps) => ({}),
)(
  ({currentGame}) => (
    <Page className="GamePage">
      <H1>{currentGame.name}</H1>
      <H2>Join us at <br/> {''+document.location}</H2>
      <Content>
        <UserWidgets users={currentGame.users || []}/>
      </Content>
      <Footer>
        <JoinGame game={currentGame}/>
      </Footer>
    </Page>
  )
)
GamePage.defaultProps = {}

export { GamePage }
