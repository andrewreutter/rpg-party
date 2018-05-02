import React, { Component } from 'react';
import { combineReducers, createStore } from 'redux'

import './App.css';
import {firedux, firebaseAuthReducer, firestoreDocReducer, firestoreCollectionReducer, firestoreCollectionRefReducer} from './lib/firedux.jsx'

import { JoinOrStartGame } from './lib/games/components/JoinOrStartGame.jsx'
import { AuthWidget } from './lib/auth/components/AuthWidget.jsx'

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

var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().useDeviceLanguage();


/* REDUX */

const APP_REDUCER = combineReducers({
  auth: firebaseAuthReducer(firebase, provider),
  gamesRef: firestoreCollectionRefReducer(firestore, 'games'),
  games: firestoreCollectionReducer(firestore, 'games'),
  currentGame: !document.location.pathname.indexOf('/games/')
    ? firestoreDocReducer(firestore, document.location.pathname)
    : (state=null, action) => state,
  // currentGameUsers: !document.location.pathname.indexOf('/games/')
  //   ? firestoreDocReducer(firestore, `${document.location.pathname}/users`)
  //   : (state=[], action) => state,
  documentPath: (state, action) => document.location.pathname,
})
const store = createStore(APP_REDUCER)
firedux.initializeApp({store})

Object.assign(window, {store, firestore, firebase})
console.log('assigned to window', {store, firestore})

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthWidget/>
        <JoinOrStartGame/>
      </div>
    );
  }
}

export { App, store };
