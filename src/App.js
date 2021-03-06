import React, { Component } from 'react';
import { combineReducers, createStore } from 'redux'

import './App.css';
import {firedux, firestoreDocReducer, firestoreCollectionReducer, firestoreCollectionRefReducer} from './lib/firedux.jsx'
import { makeAuthReducer } from './lib/auth/reducers.jsx'

import { GamePage } from './lib/pages/components/GamePage.jsx'
import { StartPage } from './lib/pages/components/StartPage.jsx'

/* FIREBASE */

const firebase = require("firebase");
require("firebase/firestore"); // Required for side-effects

const config = {
    apiKey: "AIzaSyBLV7sH7mSlIHNZl6R9EYKUfAwIULBFTqQ",
    authDomain: "rpgparty-be57f.firebaseapp.com",
    projectId: "rpgparty-be57f",
    // firestoreURL: "https://rpgparty-be57f.firebaseio.com",
    // storageBucket: "",
    // messagingSenderId: "672742097274"
};
firebase.initializeApp(config);
const firestore = firebase.firestore()

/* FIREBASE AUTH */

// var provider = new firebase.auth.GoogleAuthProvider();
var provider = new firebase.auth.FacebookAuthProvider();
firebase.auth().useDeviceLanguage();


/* REDUX */

const hasCurrentGame = () => !document.location.pathname.indexOf('/games/')
const APP_REDUCER = combineReducers({
  auth: makeAuthReducer(firebase, provider),
  gamesRef: firestoreCollectionRefReducer(firestore, 'games'),
  games: firestoreCollectionReducer(firestore, 'games'),
  hasCurrentGame,
  currentGame: hasCurrentGame()
    ? firestoreDocReducer(firestore, document.location.pathname)
    : (state={}, action) => state,
  documentPath: (state, action) => document.location.pathname,
})
const store = createStore(APP_REDUCER)
firedux.initializeApp({store})

Object.assign(window, {store, firestore, firebase})
console.log('assigned to window', {store, firestore, firebase})

// TODO: get react-router?
const Page = hasCurrentGame() ? GamePage : StartPage;
class App extends Component {
  render() {
    return (
      <div className="App">
        <Page/>
      </div>
    );
  }
}

export { App, store };
