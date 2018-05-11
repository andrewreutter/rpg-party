import React from 'react'
import { connect } from 'react-redux'
import './styles.css';

import { StartGame } from '../../games/components/StartGame.jsx'
import { Page } from '../../ui/components/Page.jsx'
import { H1, Footer } from '../../ui/components/Headers.jsx'

const StartPage = connect(
  (state, ownProps) => ({ currentGame:state.currentGame })
)(
  ({currentGame}) => (
    <Page className="StartPage">
      <H1>Start a Game</H1>
      <Footer>
        <StartGame/>
      </Footer>
    </Page>
  )
)
StartPage.defaultProps = {}

export { StartPage }
