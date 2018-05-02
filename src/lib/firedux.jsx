import React from 'react';
import { connect } from 'react-redux'


function firestoreDocRefReducer(firestore, name) {
  return (state=firestore.doc(name), action) => state
}
function firestoreCollectionRefReducer(firestore, name) {
  return (state=firestore.collection(name), action) => state
}


function firestoreDocReducer(firestore, name) {
  return _firestoreReducer(null, name,
    firestore.doc(name),
    snap => snap.data()
  )
}
function firestoreCollectionReducer(firestore, name) {
  return _firestoreReducer([], name,
    firestore.collection(name),
    snap => { const arr = []; snap.forEach(doc=>arr.push(doc.data())); return arr }
  )
}
function _firestoreReducer(defaultValue, name, ref, snapToData) {
  ref.onSnapshot(snap => {
    const value = snap.empty ? defaultValue : snapToData(snap)
    store.dispatch({ type: 'FIREBASE_VALUE', name, value })
  })
  return (state={ready:false, ref, value:undefined, error:undefined}, action) => (
    (action.type === 'FIREBASE_VALUE' && action.name === name)
      ? {...state, ready:true, value:action.value || []}
      : state
  )
}

function firebaseAuthReducer(firebase, provider) {
  firebase.auth().onAuthStateChanged(user => {
    store.dispatch({
      type:'SET_AUTH_USER',
      user:firebaseUserToUser(user)
    })
  })
  return (state={firebase, provider, user:firebaseUserToUser(firebase.auth().currentUser)}, action) => (
    action.type === 'SET_AUTH_USER'
      ? {...state, user:action.user}
      : state
  )
  function firebaseUserToUser(fbUser) {
    if (!fbUser) return null;
    const {email, displayName, photoURL} = fbUser
    return {email, displayName, photoURL}
  }
}

function firebaseConnect(mapStateToFirebaseReducer, mapFireStateToProps=()=>({}), mapFireRefToProps=()=>({})) {
  const connectHOC = () => {
    return connect(
      (state, ownProps) => {
        const fireState = mapStateToFirebaseReducer(state)
        return {
          fireReady: fireState.ready,
          fireStateProps: !fireState.ready ? undefined : mapFireStateToProps(fireState.value, ownProps),
          fireRefProps: mapFireRefToProps(fireState.ref, ownProps),
        }
      }
    )
  }
  return Component => {
     return connectHOC()(
    ({fireReady, fireStateProps, fireRefProps, ...ownProps}) => (
      !fireReady ? null : <Component {...ownProps} {...fireStateProps} {...fireRefProps}/>
    )
  )
}
}

let store
const firedux = {
  initializeApp: config => { ({store} = config) }
}

export {
  firedux,
  firebaseConnect,

  firebaseAuthReducer,
  firestoreDocReducer,
  firestoreDocRefReducer,
  firestoreCollectionReducer,
  firestoreCollectionRefReducer,

}
